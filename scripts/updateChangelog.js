const fs = require('fs');
const path = require('path');
const prepend = require('prepend');
const SUCCESS_COLOR = "\x1b[32m"; // Green
const ERROR_COLOR = "\x1b[31m"; // Red

/**
 * Append NEXT_VERSION_CHANGES.md to start of CHANGELOG.md
 */
try {
  const nextChangesFile = path.join(__dirname, 'NEXT_VERSION_CHANGES.md');
  const changeLogFile = path.join(__dirname, '..', 'CHANGELOG.md');

  // Get latest changes from nextChangesFile
  const changes = fs.readFileSync(nextChangesFile, 'utf8').trim();

  // Throw if no changes
  if (!changes) {
    throw(new Error(`${nextChanges} is empty`));
  }

  // Append latest changes to start of CHANGELOG.md
  prepend(changeLogFile, changes + '\n', function (error) {
    if (error) {
      throw(error);
    } else {
      console.log(SUCCESS_COLOR, 'updated CHANGELOG.md');
    }
  });
} catch (error) {
  console.error(ERROR_COLOR, error.message);

  // Exit with status 1 so Jenkins can recognize the error
  process.exit(1);
}
