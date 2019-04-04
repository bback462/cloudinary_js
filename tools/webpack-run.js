const webpack = require("webpack");

/**
 * Run webpack from node
 */
webpack(require('../webpack.config'), (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log(err);
  }
  // Done processing
  console.log('done');
});
