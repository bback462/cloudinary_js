const path = require('path');
const exec = require('child_process').execSync;
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');
const VERSION = require('../package').version;

/**
 * Add all changes to git and commit while specifying the version in the commit message
 */
try {
  const cwd = path.join(__dirname, '..');
  const commitMessage = `"Version ${VERSION}"`;
  const command = `git commit -am ${commitMessage}`;

  // Run git commit -am ${commitMessage}
  exec(command, {cwd});

  console.log(SUCCESS_COLOR, `Added a new commit: ${commitMessage}`);
} catch (error) {
  console.error(ERROR_COLOR, error.message);

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
