const path = require('path');
const exec = require('child_process').execSync;
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

const pkgPaths = [
  path.join(__dirname, '..'),
  path.join(__dirname, '../pkg/cloudinary-core'),
  path.join(__dirname, '../pkg/cloudinary-jquery'),
  path.join(__dirname, '../pkg/cloudinary-jquery-file-upload')
];

module.exports = (command, msg='') => {
  if (!command){
    throw(new Error('No command specified'));
  }

  // For each path run the command
  pkgPaths.forEach(pkg => {
    exec(command, {cwd: pkg});
    console.log(SUCCESS_COLOR, `${pkg} ${msg}`);
  });
};
