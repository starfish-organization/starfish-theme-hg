import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as glob from 'glob';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

export default function render({ rootInputPath, renderedDistPath, themePath }) {
  const inputPath = path.resolve(rootInputPath);

  if (!fs.statSync(inputPath).isDirectory()) {
    throw new Error('input path is not a directory');
  }
  if (!fs.statSync(path.join(inputPath, 'config.yaml')).isFile()) {
    throw new Error('config.yaml file not found');
  }
  if (!fs.existsSync(renderedDistPath)) {
    throw new Error(`${renderedDistPath} not exist.`);
  }

  const starfishConfigure = yaml.safeLoad(fs.readFileSync(path.join(inputPath, 'config.yaml'), 'utf-8'));

  const ngFactoryFilePath = path.join(themePath, './dist-server/main');

  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(ngFactoryFilePath);

  const ignoreRegExp = new RegExp(starfishConfigure.SSR.IGNORE.map(regex => new RegExp(regex).source).join('|'));

  glob(path.join(renderedDistPath, '**/index.html'), function(err, files) {
    files
      .filter(file => {
        return !ignoreRegExp.test(file.replace(/^build/, ''));
      })
      .forEach(file => {
        try {
          const webRelativeUrl = file.split(renderedDistPath)[1];
          renderModuleFactory(AppServerModuleNgFactory, {
            document: fs.readFileSync(file, 'utf-8'),
            url: webRelativeUrl,
            extraProviders: [
              provideModuleMap(LAZY_MODULE_MAP),
              {
                provide: 'STATIC_DIST',
                useValue: renderedDistPath
              }
            ]
          }).then(html => {
            fs.writeFileSync(path.join(renderedDistPath, webRelativeUrl), html, 'utf-8');
          });
        } catch (error) {
          console.error(error);
        }
      });
  });
}
