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
function render(_a) {
    var rootInputPath = _a.rootInputPath, renderedDistPath = _a.renderedDistPath, themePath = _a.themePath;
    var inputPath = path.resolve(rootInputPath);
    if (!fs.statSync(inputPath).isDirectory()) {
        throw new Error('input path is not a directory');
    }
    if (!fs.statSync(path.join(inputPath, 'config.yaml')).isFile()) {
        throw new Error('config.yaml file not found');
    }
    if (!fs.existsSync(renderedDistPath)) {
        throw new Error(renderedDistPath + " not exist.");
    }
    var starfishConfigure = yaml.safeLoad(fs.readFileSync(path.join(inputPath, 'config.yaml'), 'utf-8'));
    var ngFactoryFilePath = path.join(themePath, './dist-server/main');
    var _b = require(ngFactoryFilePath), AppServerModuleNgFactory = _b.AppServerModuleNgFactory, LAZY_MODULE_MAP = _b.LAZY_MODULE_MAP;
    var ignoreRegExp = new RegExp(starfishConfigure.SSR.IGNORE.map(function (regex) { return new RegExp(regex).source; }).join('|'));
    glob(path.join(renderedDistPath, '**/index.html'), function (err, files) {
        files
            .filter(function (file) {
            return !ignoreRegExp.test(file.replace(/^build/, ''));
        })
            .forEach(function (file) {
            try {
                var webRelativeUrl_1 = file.split(renderedDistPath)[1];
                platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
                    document: fs.readFileSync(file, 'utf-8'),
                    url: webRelativeUrl_1,
                    extraProviders: [
                        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP),
                        {
                            provide: 'STATIC_DIST',
                            useValue: renderedDistPath
                        }
                    ]
                }).then(function (html) {
                    fs.writeFileSync(path.join(renderedDistPath, webRelativeUrl_1), html, 'utf-8');
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    });
}
exports.default = render;
