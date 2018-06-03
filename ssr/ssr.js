"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var glob = require("glob");
var platform_server_1 = require("@angular/platform-server");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
require("zone.js/dist/zone-node");
require("reflect-metadata");
function render(rootInputPath) {
    var inputPath = path.resolve(rootInputPath);
    if (!fs.statSync(inputPath).isDirectory()) {
        throw new Error('input path is not a directory');
    }
    if (!fs.statSync(path.join(inputPath, 'config.yaml')).isFile()) {
        throw new Error('config.yaml file not found');
    }
    var starfishConfigure = yaml.safeLoad(fs.readFileSync(path.join(inputPath, 'config.yaml'), 'utf-8'));
    var themePath = path.join(inputPath, starfishConfigure.STYLE.THEMEDIR, starfishConfigure.STYLE.THEME);
    // const ngFactoryFileName = fs
    //   .readdirSync(path.join(themePath, './dist-server/'))
    //   .filter(name => /^main.+.bundle.js$/.test(name))[0];
    var ngFactoryFilePath = path.join(themePath, './dist-server/main');
    var _a = require(ngFactoryFilePath), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
    var buildedPath = path.join('.', 'build');
    var ignoreRegExp = new RegExp(starfishConfigure.SSR.IGNORE.map(function (regex) { return new RegExp(regex).source; }).join('|'));
    glob(path.join(buildedPath, '**/*.html'), function (err, files) {
        files
            .filter(function (file) {
            return !ignoreRegExp.test(file.replace(/^build/, ''));
        })
            .forEach(function (file) {
            var url = file.split(buildedPath)[1];
            platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
                document: fs.readFileSync(file, 'utf-8'),
                url: url,
                extraProviders: [
                    module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
                ]
            }).then(function (html) {
                fs.writeFileSync(path.join(buildedPath, url), html, 'utf-8');
            });
        });
    });
}
exports.default = render;
