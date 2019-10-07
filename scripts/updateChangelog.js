const fs = require('fs');
const path = require('path');
const prepend = require('prepend');
const dateFormat = require('dateformat');
const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

const VERSION = require('../package').version;
const NEXT_CHANGES_FILE = 'NEXT_VERSION_CHANGES.md';
const CHANGELOG_FILE = 'CHANGELOG.md';

const throwError = (subject, problem, solution) => {
  throw(new Error(`${subject} ${problem}. ${solution}`));
};

/**
 *
 * Throws an error if changes is not valid
 * @param changes - string content of NEXT_CHANGES_FILE
 * @param changeLog - string content of CHANGELOG_FILE
 * @throws {Error} if changes is empty, contains a title, or changeLog contains the version from package.json
 */
const validateChanges = (changes, changeLog) => {
  // Throw if changes file is empty
  if (!changes) {
    throwError(
      NEXT_CHANGES_FILE,
      'is empty',
      `You should put next version (${VERSION}?) changes in it`
    );
  }

  // Throw if changes file contains a title line
  if (changes.includes('====')) {
    throwError(
      NEXT_CHANGES_FILE,
      'should not contain a title',
      'The title is generated automatically'
    );
  }

  // Throw if changeLogFile already contains changes for current version
  if (changeLog.includes(`${VERSION} /`)) {
    throwError(
      CHANGELOG_FILE,
      `already contains changes for version ${VERSION}`,
      'Did you forget to update the version in package.json?'
    );
  }
};

/**
 * Get contents of nextChangesFile
 * @param nextChangesFile - path of file that contains next entry for CHANGELOG.md
 * @param changeLogFile - path of CHANGELOG.md
 * @returns {string}
 * @throws {Error} if error in validating changes
 */
const getChanges = (nextChangesFile, changeLogFile) => {
  const changes = fs.readFileSync(nextChangesFile, 'utf8').trim();
  const changeLog = fs.readFileSync(changeLogFile, 'utf8').trim();

  validateChanges(changes, changeLog);

  const title = `${VERSION} / ${dateFormat(new Date(), "yyyy-mm-dd")}`;
  const titleLine = '\n==================\n\n';

  return `${title}${titleLine}${changes}\n`;
};

/**
 * Append CHANGES_FILE to start of CHANGELOG.md
 * CHANGES_FILE should not contain a title as it is created automatically
 */
try {
  const changeLogFile = path.join(__dirname, '..', CHANGELOG_FILE);
  const nextChangesFile = path.join(__dirname, NEXT_CHANGES_FILE);

  // Get latest changes from CHANGES_FILE
  const changes = getChanges(nextChangesFile, changeLogFile);

  // Append latest changes to start of CHANGELOG.md
  prepend(changeLogFile, changes, (error) => {
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
