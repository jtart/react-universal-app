# uni

[![Greenkeeper](https://badges.greenkeeper.io/jtart/uni.svg)](https://greenkeeper.io/)
[![Code Coverage](https://coveralls.io/repos/github/jtart/uni/badge.svg?branch=master)](https://coveralls.io/github/jtart/uni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jtart/uni/badge.svg)](https://snyk.io/test/github/jtart/uni)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@jtart/uni/dist/uni.es.js?compression=gzip)](https://unpkg.com/@jtart/uni/dist/uni.es.js)
[![CircleCI status](https://circleci.com/gh/jtart/uni.svg?style=svg)](https://circleci.com/gh/jtart/uni)

uni is a Universal React library; uni leverages React Router.

uni is tiny; uni is 1kb.

## Usage

### App

uni uses React Router 4. Define your [routes](https://www.npmjs.com/package/react-router-config#route-configuration-shape) in an array and export them.

```JavaScript
// app/routes.js
import Home from 'components/Home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    getInitialProps: await (ctx) => {
      const someInitialProps = { foo: 'bar' };

      return someInitialProps;
    },
  },
  ...
];

export default routes;
```

```JavaScript
// app/components/Home.js

const Index = ({ foo }) => (
  <div>
    <h1>{foo}</h1>
  </div>
)

export default Index;
```

#### getInitialProps

Like Next.JS and After.JS, uni uses a `getInitialProps` function. However in contrast to the aforementioned libraries, `getInitialProps` is defined in the route configuration, not the component.

This provides a clearer seperation of concerns and agnosticism between components and data fetching. This has an implicit benefit of reducing the barrier to entry for development; a static `getInitialProps` on a component has the potential to be extremely confusing to a beginner React developer who is still learning the ropes of the React lifecycle.

`getInitialProps` is an async function that called is internally by uni when a route matches. uni will inject the returned data as props into route's defined component.

A `ctx` object is passed to `getInitialProps`, which includes:

- `match`: React Router's [match](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md) object
- `req`: An express-like request object - **only passed on the server**

### Client

To setup client hydration, use `hydrateClient`, passing:

- your app routes array

```JavaScript
  // client.js

  import { hydrateClient } from "@jtart/uni";
  import routes from "app/routes";

  hydrateClient(routes);
```

### Server

To render your app on a server, use `render`, passing:

- an express-like request object
- your app routes array
- an array of script URLs - an array of URLs pointing of the client-side JavaScript bundle

```JavaScript
  // server.js

  import { render } from '@jtart/uni';
  import routes from 'app/routes';

  ...
  get('/*', async (req, res) => {
    const scripts = [ 'https://example.com/bundle.js' ];

    const { statusCode, html } = await render(req, routes, scripts);

    res.status(statusCode).send(html);
  });
  ...
```

## Example

There is a simple example provided in `./example`. It uses [razzle](https://github.com/jaredpalmer/razzle/), and is used in integration tests. The application has 3 routes: `/`, `/home`, and `/param/:id`.

### Usage

You can install `@jtart/uni` from local source code or from NPM. The former is incredibly useful for local development, especially when used in conjunction with the development build of uni and this example. There is development and production build scripts provided for the example.

#### Installing from local source code

To install uni locally, follow these steps:

1. CD to `./example`
2. Run `npm install`
3. Run `npm run link-local-uni` - setups up required symlinks

#### Installing from NPM

To install uni from NPM, follow these steps:

1. CD to `./example`
2. Run `npm run unlink-local-uni` - ensure any symlinks are removed
3. Run `npm install`

#### Starting

You can start the example in a development or production environment. To start the example in...

- development: run `npm run dev`
- production: run `npm run build && npm run start`
