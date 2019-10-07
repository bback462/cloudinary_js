const path = require('path');
const exec = require('child_process').execSync;
const runCommandForAllPackages = require('runCommandForAllPackages');
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

/**
 * Publish packages to npm:
 * Run "npm publish" for each package
 */
try {
  const command = 'npm publish';

  // For each path run "npm publish"
  runCommandForAllPackages(command, `published to npm`);
} catch (error) {
  console.error(ERROR_COLOR, error.message);

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
