const fs = require('fs');
const path = require('path');
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

try {
  if (process.argv.length < 3) {
    throw("Error: No CHANGELOG.md content provided");
  }

  const args = process.argv.slice(2);

  if (args.length > 1) {
    throw("Error: Too many arguments provided, expected only CHANGELOG.md content: " + argv.join(', '));
  }

  const changeLogFile = path.join(__dirname, '..', 'CHANGELOG.md');

  fs.writeFileSync(changeLogFile, args[0], {encoding:'utf8'});
} catch (error) {
  console.error(ERROR_COLOR, error.toString());

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
