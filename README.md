# uni

[![CircleCI](https://circleci.com/gh/jtart/uni.svg?style=svg)](https://circleci.com/gh/jtart/uni)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@jtart/uni/dist/uni.es.js?compression=gzip)](https://unpkg.com/@jtart/uni/dist/uni.es.js)

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

#### getInitialProps

Like Next.JS and After.JS, uni uses a `getInitialProps` function. However in contrast to the aforementioned libraries, `getInitialProps` is defined in the route configuration, not the component.

This provides a clearer seperation of concerns and agnosticism between components and data fetching. This has an implicit benefit of reducing the barrier to entry for development; a static `getInitialProps` on a component has the potential to be extremely confusing to a beginner React developer who is still learning the ropes of the React lifecycle.

`getInitialProps` is an async function that called is internally by uni when a route matches. uni will inject the returned data as props into route's defined component.

A `ctx` object is passed to `getInitialProps`, which includes:

- `match`: React Router's [match](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md) object
- `req`: An express-like request object - **only passed on the server**

```JavaScript
// app/components/Home.js

const Index = ({ foo }) => (
  <div>
    <h1>{foo}</h1>
  </div>
)

export default Index;
```

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
- your assets array. This is an array of objects, which has a `js` attribute that is URL pointing to some client-side JavaScript

```JavaScript
  // server.js

  import { render } from '@jtart/uni';
  import routes from 'app/routes';

  ...
  const assets = [
    {
      js: 'https://example.com/bundle.js'
    }
  ]

  const { statusCode, html } = await render(req, routes, assets);

  res.status(statusCode).send(html);
  ...
```
