# Svelte library development

Everything you need to build and maintain the `@abcnews/components-storylab` library.

## Developing

Everything inside `src/lib` is part of your library. We use Storybook for component development, documentation, and as a showcase.

Quick start:

1. `git clone https://github.com/abcnews/components-storylab`
2. `cd components-storylab && npm i`
3. `npm run storybook`

### Storybook

To work around CORS issues when developing against ABC servers, you should set the `AUNTY_HOST` environment variable to your machine's full hostname:

```sh
AUNTY_HOST=http://xxx.aus.aunty.abc.net.au:6006/ npm run storybook
```

### Testing

We use [Vitest](https://vitest.dev/) for unit and component testing.

To run all tests once:

```sh
npm test
```

To run tests in watch mode:

```sh
npm run test:unit
```

For an example of how to write a component test using `vitest-browser-svelte`, see [`src/lib/mapLibre/MapLibreLoader/MapLibreLoader.svelte.test.ts`](src/lib/mapLibre/MapLibreLoader/MapLibreLoader.svelte.test.ts).

Refer to the [Svelte Vitest documentation](https://svelte.dev/docs/svelte/testing#Unit-and-component-tests-with-Vitest) for more details on testing Svelte components.

## Building

To build the library for distribution:

```sh
npm run build
```

This will run `svelte-package` to create the `dist` directory.

### Linking into your Aunty project

To develop components directly against your live app, use `npm link`.

1. Build the package:
   ```sh
   npm run build
   ```
2. Create the link in this repository:
   ```sh
   npm link
   ```
3. Link the package in your consuming repository:
   ```sh
   npm link @abcnews/components-storylab
   ```
4. Then add your `aunty` config so it gets built properly. For `npm link` to work, you need to add the path on the filesystem to `includedDependencies`:

```js
  "aunty": {
    "type": "svelte",
    "build": {
      "entry": [
        "index"
      ],
      "includedDependencies": [
        "@abcnews/components-builder",
        "@abcnews/components-storylab",
        "/Users/kyd.ashley/Web/components-storylab"
      ]
    }
  }
```

Note: I haven't been able to get svelte components linked into an Aunty project without errors. If you work this out please update the docs.

## Publishing

The package is published on [npmjs.com/package/@abcnews/components-storylab](https://www.npmjs.com/package/@abcnews/components-storylab).

1. Bump the version:
   ```sh
   npm version patch|minor|major
   ```
2. Build the library:
   ```sh
   npm run build
   ```
3. Publish to npm:
   ```sh
   npm publish
   ```
