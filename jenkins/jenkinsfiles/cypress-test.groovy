pipeline {
  agent {
    kubernetes {
      yaml readTrusted('jenkins/pod-templates/cypress.yaml')
      defaultContainer "shell"
    }
  }

    parameters {
        string(name: 'BRANCH', defaultValue: 'public', description: 'Branch to clone (ahmad-branch)')
        string(name: 'SL_LABID', defaultValue: '', description: 'Lab_id')
    }
    environment {
      NO_COLOR = "true"
      MACHINE_DNS = 'http://internal-template.btq.sealights.co:8081'
    }
    options{
        buildDiscarder logRotator(numToKeepStr: '10')
        timestamps()
    }

    stages{
        stage("Init test"){
            steps{
                script{
                git branch: params.BRANCH, url: 'https://github.com/Sealights-btq/template-btq.git'
                }
            }
        }
        stage("Setup pnpm") {
          steps {
            script {
              sh """
                corepack enable || true
                corepack prepare pnpm@latest --activate || npm install -g pnpm
              """
            }
          }
        }

        stage('download NodeJs agent and scanning Cypress tests') {
            steps{
                script{
                    withCredentials([string(credentialsId: 'sealights-token', variable: 'SL_TOKEN')]) {
                        sh """
                        cd integration-tests/cypress/
                     # Try to install pnpm via corepack, fallback to npm if it fails
                    corepack enable || true
                    if ! corepack prepare pnpm@latest --activate 2>/dev/null; then
                        echo "Corepack failed, installing pnpm via npm with --force"
                        npm install -g pnpm --force || true
                    fi
                    # Verify pnpm is available and working
                    if ! pnpm --version >/dev/null 2>&1; then
                        echo "pnpm not available, attempting direct npm install"
                        npm install -g pnpm --force
                    fi
                    pnpm --version || (echo "pnpm installation failed" && exit 1)
                    cd integration-tests/cypress/
                    pnpm install
                    pnpm add sealights-cypress-plugin@2.0.129
                    pnpm add process
                    export NODE_DEBUG=sl
                    export CYPRESS_SL_ENABLE_REMOTE_AGENT=false
                    export CYPRESS_SL_TEST_STAGE="Cypress-Test-Stage"
                    export MACHINE_DNS="${params.MACHINE_DNS1}"
                    export CYPRESS_machine_dns="${params.MACHINE_DNS1}"
                    export CYPRESS_SL_LAB_ID="${params.SL_LABID}"
                    export CYPRESS_SL_TOKEN="${params.SL_TOKEN}"
                    pnpm remove cypress
                    if [ -n "${params.CYPRESS_VERSION}" ]; then
                        pnpm add -D cypress@"${params.CYPRESS_VERSION}"
                    else
                        pnpm add -D cypress@latest
                    fi
                    pnpm exec cypress install
                    # Run pnpm audit and handle vulnerabilities
                    pnpm audit --audit-level=high || true
                    pnpm exec cypress run --spec "cypress/integration/api.spec.js"
                        """
                    }
                }
            }
        }
    }
}
