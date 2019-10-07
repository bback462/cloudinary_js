const path = require('path');
const exec = require('child_process').execSync;
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

/**
 * Update versions in package.json of root and /pkg
 */
try {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    throw("Error: No update type provided");
  }

  if (args.length > 1) {
    throw("Error: Too many arguments provided, expected only update type: " + argv.join(', '));
  }

  const command = `npm version ${args[0]}`;

  const pkgPaths = [
    path.join(__dirname, '..'),
    path.join(__dirname, '../pkg/cloudinary-core'),
    path.join(__dirname, '../pkg/cloudinary-jquery'),
    path.join(__dirname, '../pkg/cloudinary-jquery-file-upload')
  ];

  // For each path run "npm version <update-type>" to update version
  pkgPaths.forEach(pkg => {
    exec(command, {cwd: pkg});
    console.log(SUCCESS_COLOR, `updated ${pkg}`);
  });

} catch (error) {
  console.error(ERROR_COLOR, error.message);

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
