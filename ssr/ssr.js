"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var glob = require("glob");
require("zone.js/dist/zone-node");
require("reflect-metadata");
// import { INITIAL_CONFIG } from '@angular/platform-server';
var common_1 = require("@angular/common");
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
    var _b = require(ngFactoryFilePath), renderModuleFactory = _b.renderModuleFactory, AppServerModuleNgFactory = _b.AppServerModuleNgFactory, renderModule = _b.renderModule, AppServerModule = _b.AppServerModule;
    var ignoreRegExp = new RegExp(starfishConfigure.SSR.IGNORE.map(function (regex) { return new RegExp(regex).source; }).join('|'));
    glob(path.join(renderedDistPath, '**/index.html'), function (err, files) {
        files
            .filter(function (file) {
            return !ignoreRegExp.test(file.replace(/^build/, ''));
        })
            .forEach(function (file) {
            console.log(file);
            try {
                var webRelativeUrl_1 = file.split(renderedDistPath)[1];
                // AppServerModuleNgFactory(renderModuleFactory)
                renderModule(AppServerModule, {
                    document: fs.readFileSync(file, 'utf-8'),
                    url: webRelativeUrl_1,
                    extraProviders: [
                        // {
                        //   provide: INITIAL_CONFIG,
                        //   useValue: {
                        //     document: fs.readFileSync(file, 'utf-8'),
                        //     url: webRelativeUrl
                        //   }
                        // },
                        { provide: common_1.APP_BASE_HREF, useValue: webRelativeUrl_1 },
                        {
                            provide: 'STATIC_DIST',
                            useValue: renderedDistPath
                        }
                    ]
                })
                    .then(function (html) {
                    fs.writeFileSync(path.join(renderedDistPath, webRelativeUrl_1), html, 'utf-8');
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    });
}
exports.default = render;
