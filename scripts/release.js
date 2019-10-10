// Pull Changes
git pull
npm install

// Build
npm run build
npm run copybuilds

//test
npm run test

// Update Version
npm run update:version <update_type: patch/minor/major>.

//update changelog
npm run update:changelog <changes>.

//rebuild and test
npm run build
npm run copybuilds
npm run verify-pkgs
npm run test
npm run test:pkgs
npm run:test:pkgs:minified

//commit
npm run version-commit
git tag <VERSION> -a

git push
git push --tags
npm run publish-to-npm
