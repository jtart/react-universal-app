# uni

[![Greenkeeper](https://badges.greenkeeper.io/jtart/uni.svg)](https://greenkeeper.io/)
[![Code Coverage](https://coveralls.io/repos/github/jtart/uni/badge.svg?branch=master)](https://coveralls.io/github/jtart/uni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jtart/uni/badge.svg)](https://snyk.io/test/github/jtart/uni)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@jtart/uni/dist/uni.es.js?compression=gzip)](https://unpkg.com/@jtart/uni/dist/uni.es.js)
[![CircleCI status](https://circleci.com/gh/jtart/uni.svg?style=svg)](https://circleci.com/gh/jtart/uni)

uni is a tiny library that provides sensible interfaces for creating Universal React components and building a single-page application.

## Philosophy

**uni aims to provide an agnosticism between routing/data fetching and components.** It defines data fetching alongside route configuration, which provides a concise implementation and a clear seperation of concerns. This also reduces the barrier to entry for newer React developers. Your React components are just React components.

**uni aims to be unopinionated and flexible.** It doesn't make assumptions about where or how you will setup your application, and gives you the ability to plugin any library you want to extend your React application with comparate ease, and without feeling like you are overriding the core mechanics of uni.

**uni aims to be as small as possible.** It provides just the right out of scaffolding needed to get your server-side rendered SPA with Universal React components out the door.

## Getting Started

To get started quickly, view the [example applications](https://github.com/jtart/uni/tree/master/examples). These applications give a concise depiction of how to build an application using uni.

Alternatively, follow the steps below to get started.

### Installation

```bash
npm install @jtart/uni react react-dom react-helmet
```

### App

The following gives information on how to setup routing and data fetching in the main React application. Once you have setup your routes, you can pass them to APIs that uni provides for server-side rendering and client-side hydration.

#### Routing

uni uses React Router 4, which is a great foundation for serving pages as components and providing route configuration. To define your routes, create some [route configuration](https://www.npmjs.com/package/react-router-config#route-configuration-shape) and export them.

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
uni provides a very familiar `getInitialProps` for data fetching, which is defined in the route configuration.

This provides a clear seperation of concerns and agnosticism between route configuration/data fetching and components. Your React components are just React components, and you can swap components on routes as much as you please.

This has an implicit benefit of reducing the barrier to entry for development for new React developers as the flow of data in the application is clear and defined.

##### `await getInitialProps(ctx): { data }`
`getInitialProps` is an asynchronous function that is defined on the configuration of a route. It called is internally by uni when a route matches, and the returned data is passed as props to the route's defined component. `getInitialProps` is optional.

A `ctx` object is passed to `getInitialProps`, which includes:

- `match` - React Router's [match](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md) object

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

uni supports React Router's parameterized routing. As data fetching is defined on the route, parameterized routing is a breeze, and can be handled very cleanly.

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

#### Managing the document head
uni delegates to [react-helmet](https://github.com/nfl/react-helmet) for managing the head elements of the document. uni manages the render and injection of react-helmet head elements on the server, so all you need to do is create the elements!

```JavaScript
// app/components/Home.js

import Helmet from 'react-helmet';

const Home = ({ title }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>
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

uni doesn't make assumptions about what your server setup will look like, and which gives you the power to setup as you please. It provides you with a single API for the server, `render`, which will return a statusCode and HTML.

#### `await render(url, routes, scripts, ?serverWrapper): { statusCode, html }`
`render` is an asynchronous function that will render your React application and return a status code and HTML. If uni fails to render, a status code and `null` HTML will be returned.

`render` accepts the following arguments:
- `url` - a [Node.JS HTTP URL-like object](https://nodejs.org/api/http.html#http_message_url)
- `routes` - an array of React Router routes
- `scripts` - an array of URLs that that will be used to create deferred script elements, injected below the main body of the page. These scripts likely contain a client-side bundle of the React application, but don't have to
- `?serverWrapper` - an optional HOC that wraps the React application in the server-side render. See [plugging in libraries](#plugging-in-libraries) for more information on wrappers

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

To hydrate your React application on the client, uni exposes a `hydrateClient` function. Hydration will take data that was used on the server for the server-side render, and inject it as initial data into the client-side React application.

#### `hydrateClient(routes, ?clientWrapper)`
`hydrateClient` is a synchronous function that will hydrate your React application that was rendered on the server by `render`. `hydrateClient` is optional if you don't want to build a single-page application.

`hydrateClient` accepts the following arguments:
- `routes` - an array of React Router routes
- `?clientWrapper` - an optional HOC that wraps the client-side React application. See [plugging in libraries](#plugging-in-libraries) for more information on wrappers

```JavaScript
  // client.js

  import { hydrateClient } from "@jtart/uni";
  import routes from "./app/routes";
  import clientWrapper from "./wrappers/client";

  hydrateClient(routes, clientWrapper);
```

### Plugging in libraries
uni allows you to plugin libraries into the lifecycle of the uni application through interfaces known as `wrappers`. A wrapper is a higher-order component that extends the functionality of the main React application, usually through the integration of libraries or state management tools. There are two types of wrappers: `server` and `client`.

#### Server
A server wrapper is an asynchronous HOC that is used on a server-side render. An example use-case could be the creation of some inital state, styles, etc, which can be injected into the `head` of the HTML Document on the server-side render, through the `getAdditionalHeadProps` function.

##### `getAdditionalHeadProps: [data]`
`getAdditionalHeadProps` is a synchronous function that is called after the React application has been rendered, but before it is injected into the main HTML document.

`getAdditionalHeadProps` serves as an optional escape hatch for injecting additional elements into the `head` of the document that are generated within the server wrapper. For most head elements, you should see [managing the docunent head](#managing-the-document-head).

These elements might be script elements containing initial JSON data. For these purposes, uni exposes a `ServerData` component, which serialises passed JSON data - pass the JSON in the `data` prop, and give it an `id`, which can be used in the client wrapper to return the initial server-side fetched data.

```JavaScript
// ./wrappers/server.jsx

import { SomeLibraryClient, SomeLibraryProvider } from 'some-library';
import { ServerData } from '@jtart/uni';

async function serverWrapper(App) {
  this.someLibraryClient = new SomeLibraryClient();
  
  try {
    await this.someLibraryClient.fetchSomeInitialState(App);
  } catch (error) {
    // handle errors;
  }
  
  return <SomeLibraryProvider client={this.someLibraryClient}>{App}</SomeLibraryProvider>
}

serverWrapper.getAdditionalHeadProps = function() {
  const initialState = this.client.getInitialState();

  return [<ServerData key={'someKey'} id="__INITIAL_STATE__" data={initialState} />];
};

export default serverWrapper;
```

**NOTE: the server wrapper and `getAdditionalHeadProps` functions must not be arrow functions if you wish to bind objects to `this`.**

### Client
A client wrapper is a synchronous HOC that wraps the main React application when it is being hydrated on the client, after it was rendered on the server. An example use-case could be wrapping the app in a state management library, and hydrating the client-side application with some initial state that was created on the server.

```JavaScript
// ./wrappers/client.jsx

import { SomeLibraryClient, SomeLibraryProvider } from 'some-library';

const clientWrapper = App => {
  const initialState = JSON.parse(
    window.document.getElementById('__INITIAL_STATE__').textContent,
  );

  const someLibraryClient = new SomeLibraryClient(initialState);

  return <SomeLibraryProvider client={someLibraryClient}>{App}</SomeLibraryProvider>;
};

export default clientWrapper;
```
