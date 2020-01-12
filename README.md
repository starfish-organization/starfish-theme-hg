# Hg

> [starfish](https://github.com/A-Horse/starfish) theme

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Publish
`npm run build` and `npm run build:ssr` must be run before publish, because the `starfish` build requires `dist` and `dist-server` files.

## Development
### start local server
``` bash
cd blog-build-static 
http-server . -p 8022
```

and start angular dev server
``` bash
npm run start 
```