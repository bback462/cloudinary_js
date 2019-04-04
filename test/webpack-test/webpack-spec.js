const webpack = require('webpack');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const path = require('path');

jasmine.loadConfig({
  spec_dir: '.',
  spec_files: [
    path.resolve(__dirname, 'dist-test', 'webpack-test.js'),
  ],
});

webpack({
    entry: path.resolve(__dirname, 'bundle-spec.js'),
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist-test'),
      filename: 'webpack-test.js'
    },
    resolve: {
      // options for resolving module requests
      // (does not apply to resolving to loaders)
      modules: [
        "node_modules",
        path.resolve(__dirname, "../node_modules")
      ],
      alias: {
        "cloudinary-core": "../../dist/cloudinary-core.js"
      }
    }
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('error', stats);
    } else {
      jasmine.execute();
    }
    console.log('done');
  }
);

