pipeline {
  agent any
  options { skipDefaultCheckout(true); disableConcurrentBuilds(); timestamps(); timeout(time: 20, unit: 'MINUTES'); buildDiscarder(logRotator(numToKeepStr: '30')) }
  environment { HOST_JENKINS_WORKSPACE = '/home/johnny/docker/jenkins-workspace'; DEPLOY_DIR = '/volume2/docker/wordpress-johnnyip/wp-content/reactpress/apps/projects' }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build and Deploy') { steps { sh '''set -eu
      host_source=$(printf '%s' "$PWD" | sed "s#^/var/jenkins_home/workspace#$HOST_JENKINS_WORKSPACE#")
      docker run --rm -v "$host_source:/source:ro" -v "$DEPLOY_DIR:/deploy" -w /workspace node:20-alpine sh -lc '
        cp -a /source/. /workspace
        npm install
        npm run build
        cp -R ./dist /deploy
      '
    ''' } }
  }
  post { always { step([$class: 'Mailer', recipients: 'johnny@johnnyip.com', notifyEveryUnstableBuild: false, sendToIndividuals: false]); cleanWs deleteDirs: true, disableDeferredWipeout: true, notFailBuild: true } }
}
