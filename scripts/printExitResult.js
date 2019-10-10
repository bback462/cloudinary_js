const {SUCCESS_COLOR, ERROR_COLOR} = require('./colors');

module.exports = (code, error, name) => {
  if (code > 0) {
    return console.error(ERROR_COLOR, `Exit with code ${code} from ${name} due to ${error.toString()}`);
  }
  return console.log(SUCCESS_COLOR, `${name} finished successfully`);
};
