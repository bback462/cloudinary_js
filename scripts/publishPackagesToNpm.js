const runCommandForAllPackages = require('./runCommandForAllPackages');
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

/**
 * Publish packages to npm:
 * Run "npm publish" for each package
 */
try {
  // For each path run "npm publish"
  runCommandForAllPackages('npm publish --dry-run', `published to npm`);
} catch (error) {
  console.error(ERROR_COLOR, error.toString());

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
