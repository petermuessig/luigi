const liveServer = require('live-server');
const webpack = require('webpack');
const fs = require('fs-extra');
const config = require('../webpack.config');
config.mode = 'development';
config.devtool = 'eval-source-map';
const webpack_compiler = webpack(config);

let logo_ascii = `
                              //
                        /////   /////
                   /////             /////
              /////                       /////
         ////                                   ////
      //                                            *//
     //                        ////                   //
     //                     ////////                  //
    //                    ////////   ///               //
    //                 ////////   ////////             //
   //                ////////   ////////   //           //
  //              ////////   ////////    ///////        ///
  //            ////////   ////////   ////////           //
 //          ////////   ////////    ////////              //
 //            ////////   ////   ////////                 //
 //              ////////      ////////                   //
  ///               ////////   /////                    ///
    ///               ////////                         ///
      ///                //////                     ///
        ///                //                     ///
          ///                                   ///
            ///                               ///
              ///                           ///
                /////////////////////////////




        ///                    ///               ///
        ///
        ///        ///    ///  ///   ////////    ///
        ///        ///    ///  ///   ///   ///   ///
        ///        ///    ///  ///    /////      ///
        /////////  ////// ///  ///   /////////   ///
                                    ///     ///
                                      //////
                                      powered by Luigi Dashboard!

`;
console.log('\x1b[32m', logo_ascii, '\x1b[0m');

const rootPath = './dev-tools/simple-app';
const indexPath = rootPath + '/index.html';
try {
  if (fs.existsSync(indexPath)) {
    console.log('\x1b[32mFound ' + indexPath, '\x1b[0m');
  } else {
    console.log(
      '\x1b[33mCould not find ' + indexPath,
      '\nInitializing new minimalistic Luigi app from template...',
      '\x1b[0m'
    );
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }
    fs.copy('./dev-tools/templates/simple', rootPath);
    console.log('\x1b[32mNew Luigi app created under ' + rootPath, '\x1b[0m');
  }
} catch (err) {
  console.error(err);
}

webpack_compiler.hooks.watchRun.tap('CLI output', () => {
  console.log('\x1b[33mWebpack [' + new Date().toLocaleTimeString() + ']: ', ' Rebuild in progress...', '\x1b[0m');
});

const watching = webpack_compiler.watch(
  {
    aggregateTimeout: 300,
    poll: undefined,
    logLevel: 'verbose'
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    if (stats.hasErrors()) {
      console.log(
        '\x1b[33mWebpack [' + new Date().toLocaleTimeString() + ']: ',
        '\x1b[31m',
        'Rebuild of Luigi core failed! \n',
        stats.toString({
          all: false,
          errors: true,
          colors: true
        })
      );
    } else {
      console.log(
        '\x1b[33mWebpack [' + new Date().toLocaleTimeString() + ']: ',
        '\x1b[32m',
        'Luigi core rebuilt without errors.\n',
        '\x1b[0m'
      );
    }
  }
);

var params = {
  port: 4100,
  host: '0.0.0.0',
  root: rootPath,
  open: false,
  watch: ['./dev-tools', '../client/public'],
  file: 'index.html',
  wait: 1000,
  mount: [
    ['/public', './public'],
    ['/public-ie11', './public-ie11'],
    ['/public_client', '../client/public']
  ],
  logLevel: 0,
  cors: true,
  proxy: [
    ['/luigi-dashboard', 'http://localhost:8080'],
    ['/dist/', 'http://localhost:8080/dist/'],
    ['/node_modules/', 'http://localhost:8080/node_modules/']
  ]
};

liveServer.start(params);
console.log('\x1b[32mStarting live-server at', '\x1b[36m', 'http://localhost:' + params.port, '\x1b[0m');
