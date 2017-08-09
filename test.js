require('zone.js/dist/zone-node');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Import renderModuleFactory from @angular/platform-server.
var renderModuleFactory = require('@angular/platform-server').renderModuleFactory;

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.

var mainFilePath = fs.readdirSync('./dist-server/').filter(name => /^main.+.bundle.js$/.test(name))[0];

var AppServerModuleNgFactory = require('./dist-server/' + mainFilePath).AppServerModuleNgFactory;

// Load the index.html file.
var index = require('fs').readFileSync('./dist/index.html', 'utf8');

// Render to HTML and log it to the console.

const buildedPath = '/Users/chchen/MY-PROJECT/nobbb/build';
glob('/Users/chchen/MY-PROJECT/nobbb/build/**/*.html', function(err, files) {
  files.forEach(file => {
    const url = file.split(buildedPath)[1];

    renderModuleFactory(AppServerModuleNgFactory, {document: index, url: '/'})
      .then(html => {
        console.log(file);
        fs.writeFileSync(path.join(buildedPath, url), html)
      });
  });
});
