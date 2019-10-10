const runCommandForAllPackages = require('./runCommandForAllPackages');
const {ERROR_COLOR} = require('./colors');
const SCRIPT_NAME = "updateVersion";

/**
 * Update versions in package.json of root and /pkg
 */

try {
  if (process.argv.length < 3) {
    throw("Error: No update type provided");
  }

  const args = process.argv.slice(2);

  if (args.length > 1) {
    throw("Error: Too many arguments provided, expected only update type: " + argv.join(', '));
  }

  const version = args[0];
  const command = `npm version --no-git-tag-version ${version}`;

  // For each path run "npm version <update-type>" to update version
  runCommandForAllPackages(command, 'version updated');

} catch (error) {
  process.on('exit', code => {
    printExitResult(code, error, "updateVersion");
  });

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
