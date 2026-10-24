pipeline {
  agent any
  options { skipDefaultCheckout(true); disableConcurrentBuilds(); timestamps(); timeout(time: 20, unit: 'MINUTES'); buildDiscarder(logRotator(numToKeepStr: '30')) }
  environment {
    HOST_JENKINS_WORKSPACE = '/home/johnny/docker/jenkins-workspace'
    DEPLOY_DIR = '/volume2/docker/wordpress-johnnyip/wp-content/reactpress/apps/projects/build'
    WORDPRESS_CONTAINER = '20-content-01-wordpress-johnnyip-1'
    DEPLOY_URL = 'https://johnnyip.com/projects/'
    ASSET_URL = 'https://johnnyip.com/wp-content/reactpress/apps/projects/build/'
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build and Deploy') { steps { sh '''set -eu
      host_source=$(printf '%s' "$PWD" | sed "s#^/var/jenkins_home/workspace#$HOST_JENKINS_WORKSPACE#")
      docker run --rm -v "$host_source:/source:ro" -v "$DEPLOY_DIR:/deploy" -w /workspace node:20-alpine sh -lc '
        cp -a /source/. /workspace
        npm ci
        npm run build
        test -s ./build/asset-manifest.json
        cp -R ./build/. /deploy/
      '
    ''' } }
    stage('Purge and Verify Cache') { steps { sh '''set -eu
      docker exec \
        -e HTTP_HOST=johnnyip.com \
        -e HTTPS=on \
        "$WORDPRESS_CONTAINER" \
        php -r 'require "/opt/bitnami/wordpress/wp-load.php"; w3tc_flush_url("https://johnnyip.com/projects/");'

      docker run --rm -i \
        -e DEPLOY_URL="$DEPLOY_URL" \
        -e ASSET_URL="$ASSET_URL" \
        -v "$DEPLOY_DIR:/deploy:ro" \
        node:20-alpine node - <<'NODE'
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const manifest = JSON.parse(fs.readFileSync('/deploy/asset-manifest.json', 'utf8'));
const expected = ['main.js', 'main.css'].map((key) => {
  const path = manifest.files?.[key];
  if (typeof path !== 'string' || !path.startsWith('/static/') || path.includes('..')) {
    throw new Error(`Invalid or missing manifest entry ${key}`);
  }
  return path.slice(1);
});
if (manifest.files.mainJs !== manifest.files['main.js'] || manifest.files.mainCss !== manifest.files['main.css']) {
  throw new Error('Manifest compatibility aliases differ');
}
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const headers = { 'User-Agent': 'Jenkins-Portfolio-Deploy-Verification/1.0' };
(async () => {
  const response = await fetch(process.env.DEPLOY_URL, { headers });
  if (!response.ok) throw new Error(`Deployment URL returned HTTP ${response.status}`);
  const html = await response.text();
  if (!html.includes('id="root"') && !html.includes("id='root'")) {
    throw new Error('Deployment HTML does not contain the React root element');
  }
  const publicManifest = await fetch(new URL('asset-manifest.json', process.env.ASSET_URL), { headers });
  if (!publicManifest.ok) throw new Error(`Public manifest returned HTTP ${publicManifest.status}`);
  const publicFiles = (await publicManifest.json()).files;
  if (publicFiles?.['main.js'] !== manifest.files['main.js'] || publicFiles?.['main.css'] !== manifest.files['main.css']) {
    throw new Error('Public manifest does not match deployed JS/CSS');
  }
  for (const asset of expected) {
    if (!html.includes(asset)) throw new Error(`Deployment HTML does not reference ${asset}`);
    const result = await fetch(new URL(asset, process.env.ASSET_URL), { headers });
    if (!result.ok) throw new Error(`${asset} returned HTTP ${result.status}`);
    const publicBytes = Buffer.from(await result.arrayBuffer());
    if (digest(publicBytes) !== digest(fs.readFileSync(`/deploy/${asset}`))) {
      throw new Error(`Public asset bytes differ: ${asset}`);
    }
    console.log(`Verified ${asset} SHA256 ${digest(publicBytes)}`);
  }
  console.log(`Verified ${process.env.DEPLOY_URL} root, manifest, JavaScript and CSS`);
  console.log(`Cache-Control: ${response.headers.get('cache-control') || '(none)'}`);
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
NODE
    ''' } }
  }
  post { always { step([$class: 'Mailer', recipients: 'johnny@johnnyip.com', notifyEveryUnstableBuild: false, sendToIndividuals: false]); cleanWs deleteDirs: true, disableDeferredWipeout: true, notFailBuild: true } }
}
