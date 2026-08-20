pipeline {
  agent any
  options { skipDefaultCheckout(true); disableConcurrentBuilds(); timestamps(); timeout(time: 20, unit: 'MINUTES'); buildDiscarder(logRotator(numToKeepStr: '30')) }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install') { steps { sh 'npm install' } }
    stage('Build') { steps { sh 'npm run build' } }
    stage('Deploy') { steps { sh 'cp -R ./dist /reactPress/projects' } }
  }
  post { failure { mail to: 'johnny@johnnyip.com', subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}", body: "Portfolio Page Pipeline failed.\n\nJob: ${env.JOB_NAME}\nBuild: #${env.BUILD_NUMBER}\nBranch: ${env.GIT_BRANCH ?: 'main'}\nCommit: ${env.GIT_COMMIT ?: 'unknown'}\nConsole: ${env.BUILD_URL}console\n" }; always { cleanWs deleteDirs: true, disableDeferredWipeout: true, notFailBuild: true } }
}
