#!/usr/bin/env bash
rm -rf .build/node_modules
tar -czf .build.tar.gz .build
echo "Senha do SSH copiada para o seu clipboard: 19rcnking68"
echo "19rcnking68" | pbcopy
scp .build.tar.gz chalacabar@191.6.204.199:apps_nodejs/.build.tar.gz
ssh chalacabar@191.6.204.199 "\
source .bash_profile && \
cd apps_nodejs && \
echo 'Uncompressing build' && \
tar -xzf .build.tar.gz && \
rm .build.tar.gz && \
cd .build && \
echo 'Installing dependencies' && \
npm i --only=prod --silent && \
echo 'Running next build' && \
sh .env-generator.sh && \
NODE_ENV=production npm run build:next && \
cd .. && \
rm -rf site.rollback && \
mv site site.rollback && \
mv .build site && \
cp site/public/manifest.json ../www/ && \
cp site/public/js/chalacabar-service-worker.js ../www/ && \
pm2 restart site
"
