"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var glob = require("glob");
require("zone.js/dist/zone-node");
require("reflect-metadata");
var platform_server_1 = require("@angular/platform-server");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var TMPFILE = './temp.js';
function render(inputs) {
    var inputPath = path.join(inputs[0]);
    if (!fs.statSync(inputPath).isDirectory()) {
        throw new Error('input path is not a directory');
    }
    if (!fs.statSync(path.join(inputPath, 'config.yaml')).isFile()) {
        throw new Error('config.yaml file not found');
    }
    // TODO configure 应该从主程序读入-> 传入constructor
    var starfishConfigure = yaml.safeLoad(fs.readFileSync(path.join(inputPath, 'config.yaml'), 'utf-8'));
    var themePath = path.join(inputPath, starfishConfigure.STYLE.THEMEDIR, starfishConfigure.STYLE.THEME);
    var ngFactoryFilePath = fs
        .readdirSync(path.join(themePath, './dist-server/'))
        .filter(function (name) { return /^main.+.bundle.js$/.test(name); })[0];
    fs.writeFileSync(path.join(__dirname, TMPFILE), fs.readFileSync(path.join(themePath, './dist-server/', ngFactoryFilePath), 'utf-8'), 'utf-8');
    var AppServerModuleNgFactory = require(TMPFILE).AppServerModuleNgFactory;
    var LAZY_MODULE_MAP = require(TMPFILE).LAZY_MODULE_MAP;
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
        fs.unlinkSync(path.join(__dirname, TMPFILE));
    });
}
exports.default = render;
