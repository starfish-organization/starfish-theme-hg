import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as glob from 'glob';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// import { INITIAL_CONFIG } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';

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

  const { renderModuleFactory, AppServerModuleNgFactory, renderModule, AppServerModule } = require(ngFactoryFilePath);

  const ignoreRegExp = new RegExp(starfishConfigure.SSR.IGNORE.map((regex) => new RegExp(regex).source).join('|'));

  glob(path.join(renderedDistPath, '**/index.html'), function (err, files) {
    files
      .filter((file) => {
        return !ignoreRegExp.test(file.replace(/^build/, ''));
      })
      .forEach((file) => {
        console.log(file);
        try {
          const webRelativeUrl = file.split(renderedDistPath)[1];
          // AppServerModuleNgFactory(renderModuleFactory)
          renderModule(AppServerModule, {
            document: fs.readFileSync(file, 'utf-8'),
            url: webRelativeUrl,
            extraProviders: [
              // {
              //   provide: INITIAL_CONFIG,
              //   useValue: {
              //     document: fs.readFileSync(file, 'utf-8'),
              //     url: webRelativeUrl
              //   }
              // },
              { provide: APP_BASE_HREF, useValue: webRelativeUrl },
              {
                provide: 'STATIC_DIST',
                useValue: renderedDistPath,
              },
            ],
          })
            .then((html) => {
              fs.writeFileSync(path.join(renderedDistPath, webRelativeUrl), html, 'utf-8');
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      });
  });
}
