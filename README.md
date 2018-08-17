# uni

[![Greenkeeper](https://badges.greenkeeper.io/jtart/uni.svg)](https://greenkeeper.io/)
[![Code Coverage](https://coveralls.io/repos/github/jtart/uni/badge.svg?branch=master)](https://coveralls.io/github/jtart/uni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jtart/uni/badge.svg)](https://snyk.io/test/github/jtart/uni)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@jtart/uni/dist/uni.es.js?compression=gzip)](https://unpkg.com/@jtart/uni/dist/uni.es.js)
[![CircleCI status](https://circleci.com/gh/jtart/uni.svg?style=svg)](https://circleci.com/gh/jtart/uni)

uni is a tiny library that provides sensible interfaces for writing Universal React components and a single-page application.

uni uses React Router 4, which is a great foundation for serving pages as components and providing route configuration.

## Getting Started

To get started quickly, view the [example applications](https://github.com/jtart/uni/tree/master/examples). These applications give a concise depiction of how to integrate build an application using uni.

Alternatively, follow the steps below to get started.

### Installation

```bash
npm install @jtart/uni react react-dom
```

### App

The following gives information on how to setup routing and data fetching in the main React application. Once you have setup your routes, you can pass them to the client and server uni APIs. 

### Routing

uni uses React Router 4 under the hood, which you don't need to install it yourself. Expose some [route configuration](https://www.npmjs.com/package/react-router-config#route-configuration-shape) and export it.

Note: uni currently only supports a single top-level of routing.

```JavaScript
// app/routes.js
import Home from 'components/Home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  ...
];

export default routes;
```

```JavaScript
// app/components/Home.js

const Home = () => (
  <div>
    <h1>Home!</h1>
  </div>
)

export default Home;
```

#### Data Fetching
Similar to other libraries, uni utilises a `getInitialProps` function for data-fetching on the route component. However in contrast to other libraries, `getInitialProps` is defined in the route configuration, not the component.

This provides a clear seperation of concerns and agnosticism between route configuration/data fetching and components. This has an implicit benefit of reducing the barrier to entry for development; a static `getInitialProps` on a component has the potential to be extremely confusing to a beginner React developer who is still learning the ropes of the React lifecycle and ecosystem.

##### `await getInitialProps(ctx): { data }`
`getInitialProps` is an asynchronous function that is defined on the configuration of a route. It called is internally by uni when a route matches, and the returned data is passed as props to the route's defined component.

A `ctx` object is passed to `getInitialProps`, which includes:

- `match`: React Router's [match](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md) object

```JavaScript
// app/routes.js
import Home from 'components/Home';

const routes = [
  {
    ...
    getInitialProps: await (ctx) => {
      return { title: 'Home!' };;
    },
    ...
  },
  ...
];

export default routes;
```

```JavaScript
// app/components/Home.js

const Home = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
)

export default Home;
```

#### Parameterized Routing

uni supports parameterized routing in React Router, and because `getInitialProps` is defined on the route it is a breeze.

```JavaScript
// app/routes.js
import Home from 'components/Home';

const routes = [
  {
    path: '/:id',
    exact: true,
    getInitialProps: await ({ match }) => {
      const { id } = match.params;
      const response = await fetch(`/someApi/${id}`);
      const data = await response.json();
      
      return { title: 'Home!', data };;
    },
    ...
  },
  ...
];

export default routes;
```

```JavaScript
// app/components/Home.js

const Home = ({ title }) => (
  <div>
    <h1>{title}</h1>
    {
      data.map(({ title, description }) => (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      )
    }
  </div>
)

export default Home;
```

### Server

To render your app on a server, uni exposes a `render` function.

#### `await render(url, routes, scripts, ?serverWrapper): { statusCode, html }`
`render` is an asynchronous function that will render your React application and return you a status code and HTML, for you to do with as you wish.

`render` accepts the following arguments:
- `url` - a [Node.JS HTTP URL-like object](https://nodejs.org/api/http.html#http_message_url)
- `routes` - an array of React Router routes
- `scripts` - an array of URLs that that will be used to create deferred script tags. These scripts likely contain a client-side bundle of the React application, but don't have to be
- `?serverWrapper` - a wrapper HOC component that is used on the server-side render. see [wrappers](#wrappers) for more information. Optional

```JavaScript
  // server.js

  import { render } from '@jtart/uni';
  import routes from './app/routes';
  import serverWrapper from './wrappers/server';

  ...
  get('/*', async ({ url }, res) => {
    const scripts = [ 'https://example.com/bundle.js' ];

    const { statusCode, html } = await render(url, routes, scripts, serverWrapper);

    res.status(statusCode).send(html);
  });
  ...
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

### Wrappers
[Information on wrappers to come]

## Example

There is a simple example provided in `./example`. It uses [razzle](https://github.com/jaredpalmer/razzle/), and is used in integration tests. See the README for more information.
