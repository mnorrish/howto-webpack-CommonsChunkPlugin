# How to use webpack CommonsChunkPlugin

webpack's CommonsChunkPlugin is used to split code for a single JavaScript application into separate chunks without duplicating shared dependencies.

## When should the CommonsChunkPlugin be used?

The CommonsChunkPlugin is very useful when an application has different functionality on separate routes/pages.

__For example:__

An application could be webpacked as a single JavaScript entry chunk with no code splitting. This is fine for small applications but it can mean that a lot of un-used code is loaded when an application has routes.

```
# all in a single entry chunk with no code splitting

entry.js
  - app
  - routeA
  - routeB
  - routeC
  - dependency1
  - dependency2
  - dependency3
```

Code splitting allows there to be a single entry chunk containing the code to start the appplication. Separate chunks for each route are then loaded asyncronously as needed -- for exmaple when a user navigates to a route the coresponding chunk is loaded.

```
# a single entry chunk and split chunks for each route

entry.js
  - app
  - dependency3

routeA.js
  - routeA
  - dependency1
  - dependency2

routeB.js
  - routeB
  - dependency1

routeC.js
  - routeC
  - dependency1
  - dependency3
```

The problem with code splitting is that multiple chunks often share the same dependencies.

The CommonsChunkPlugin is used to detect and extract shared dependencies and bundle them more efficiently.

```
# a single entry chunk and split chunks for each route
# optimized to reduce duplication of shared dependencies.

entry.js
  - app
  - dependency1
  - dependency3

routeA.js
  - routeA
  - dependency2

routeB.js
  - routeB

routeC.js
  - routeC

```

In this example, `dependency1` is moved into the `entry` chunk because all routes depend on it. `dependency3` is kept in `entry` chunk and removed from `routeC` to avoid duplication -- because the `entry` chunk will already be loaded before `routeC`.

## Code splitting

Code splitting points are defined with `require.ensure(dependencies, callback, chunkName)`.
The optional `chunkName` gives the resulting chunk -- otherwise a number is used by default.

```javascript
require.ensure(
  ['a', 'b'], // ensure that modules 'a' and 'b' are available
  (require) => {
    // the code inside this callback is only executed after modules 'a' and 'b' are loaded

    // can now import and use modules 'a' and 'b'
    const a = require('a');
    const b = require('b');

    doSomethingWith(a, b);
  },
  'some-chunk-name' // the name of the resulting chunk
);
```

For an examples of code splitting in a routing situation see [source/app.js](source/app.js)

For more detail on code splitting with webpack see http://webpack.github.io/docs/code-splitting.html#defining-a-split-point

## Extracting shared dependencies

The webpack CommonsChunkPlugin is used by adding an instance of `webpack.optimize.CommonsChunkPlugin` to the `plugins` array in webpack configuration. Plugin options can be given to the constructor.

```javascript
// webpack configuration

const webpack = require("webpack");

module.exports = {
  entry: {
    entry: './app.js'
  },

  output: {
    ...
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // name of the entry chunk to scan for common (shared) dependencies
      // the common dependencies will be moved into this entry chunk
      name: 'entry',

      // indicate that we want to scan for common dependencies in
      // child (code split) chunks of the named entry chunk
      children: true,

      // minimum number of different chunks (entry or split) which a dependency
      // must be used by to deem it a common dependency
      minChunks: 2
    })
  ]
};
```

For more detail on CommonsChunkPlugin configuration options see http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
