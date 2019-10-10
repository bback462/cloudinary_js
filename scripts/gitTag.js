const path = require('path');
const exec = require('child_process').execSync;
const printExitResult = require('./printExitResult');
const VERSION = require('../package').version;

/**
 * Add all changes to git and commit while specifying the version in the commit message
 */
try {
  const cwd = path.join(__dirname, '..');
  const command = `git tag ${VERSION} -a --dry-run`;

  // Run git tag ${VERSION} -a
  exec(command, {cwd});

  console.log(SUCCESS_COLOR, `Added a new tag: ${VERSION}`);
} catch (error) {
  process.on('exit', code => {
    printExitResult(code, error, "gitTag");
  });

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
