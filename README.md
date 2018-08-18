# uni

[![Greenkeeper](https://badges.greenkeeper.io/jtart/uni.svg)](https://greenkeeper.io/)
[![Code Coverage](https://coveralls.io/repos/github/jtart/uni/badge.svg?branch=master)](https://coveralls.io/github/jtart/uni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jtart/uni/badge.svg)](https://snyk.io/test/github/jtart/uni)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@jtart/uni/dist/uni.es.js?compression=gzip)](https://unpkg.com/@jtart/uni/dist/uni.es.js)
[![CircleCI status](https://circleci.com/gh/jtart/uni.svg?style=svg)](https://circleci.com/gh/jtart/uni)

uni is a tiny library that provides sensible interfaces for creating Universal React components and building a single-page application.

## Philosophy

Next.JS, After.JS, etc, are great libraries for creating a Universal React application. However, the differing ways they handle routing/data fetching, and their points of flexibility, just aren't for me.

uni provides a very familiar interface for data fetching. However, uni makes a distinction between data fetching and components, and defines data fetching alongside route configuration. This provides a concise implementation; introducing a seperation of concerns and agnosticism between route configuration/data fetching and components, while having an implicit benefit of reducing the barrier to entry for newer React developers. Your React components are just React components.

uni is unopinionated and flexible. It gives a consumer the ability to plugin any library they please to their React application with comparate ease and without feeling like they are overriding the core mechanics of uni.

## Getting Started

To get started quickly, view the [example applications](https://github.com/jtart/uni/tree/master/examples). These applications give a concise depiction of how to build an application using uni.

Alternatively, follow the steps below to get started.

### Installation

```bash
npm install @jtart/uni react react-dom react-helmet
```

### App

The following gives information on how to setup routing and data fetching in the main React application. Once you have setup your routes, you can pass them to the client and server uni APIs. 

### Routing

uni uses React Router 4, which is a great foundation for serving pages as components and providing route configuration.

To define your routes, create some [route configuration](https://www.npmjs.com/package/react-router-config#route-configuration-shape) and export them.

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

#### Managing the document head
uni delegates to [react-helmet](https://github.com/nfl/react-helmet) for managing the head tags of the document. uni manages the render and injection of react-helmet head tags on the server, so all you need to do is create the tags!

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

To render your app on a server, uni exposes a `render` function.

#### `await render(url, routes, scripts, ?serverWrapper): { statusCode, html }`
`render` is an asynchronous function that will render your React application and return you a status code and HTML, for you to do with as you wish.

`render` accepts the following arguments:
- `url` - a [Node.JS HTTP URL-like object](https://nodejs.org/api/http.html#http_message_url)
- `routes` - an array of React Router routes
- `scripts` - an array of URLs that that will be used to create deferred script tags. These scripts likely contain a client-side bundle of the React application, but don't have to be
- `?serverWrapper` - an optional HOC that wraps the React application in the server-side render. See [wrappers](#wrappers) for more information

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

To re-hydrate your React application on the client, uni exposes a `hydrateClient` function.

#### `hydrateClient(routes, ?clientWrapper)`
`hydrateClient` is a synchronous function that will re-hydrate your React application that was rendered on the server by `render`.

`hydrateClient` accepts the following arguments:
- `routes` - an array of React Router routes
- `?clientWrapper` - an optional HOC that wraps the client-side React application. See [wrappers](#wrappers) for more information

```JavaScript
  // client.js

  import { hydrateClient } from "@jtart/uni";
  import routes from "./app/routes";
  import clientWrapper from "./wrappers/client";

  hydrateClient(routes, clientWrapper);
```

### Wrappers
A wrapper is an asyncronhous higher-order component that extends the functionality of the main React application, usually through the integration of libraries or state management tools. There are two types of wrappers: `server` and `client`.

#### Server
A server wrapper is an asyncronhous HOC that is used, obviously, on a server-side render. An example use-case could be the creation of some inital state, styles, etc. This data can be injected into the `head` of the HTML Document on the server-side render, through the `getAdditionalHeadProps` function.

##### `getAdditionalHeadProps: [data]`
`getAdditionalHeadProps` is a synchronous function that is called after the React application has been rendered, but before it is injected into the main HTML document. It serves as a hatch for injecting additional props into the `head` of the document. 

These props might be script tag containing initial JSON data. For these purposes, uni exposes a `ServerData` component, which serialises passed JSON data - pass the JSON in the `data` prop, and give it an `id`. This `id` can be used in the client wrapper to return the initial server-side fetched data.

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

**NOTE: Lexical Scope - the server wrapper and `getAdditionalHeadProps` functions must not be arrow functions if you wish to bind objects to `this`.**

### Client
A client wrapper is a syncronhous HOC that wraps the main React application when it is being re-hydrated after it was server-side rendered. An example use-case could be wrapping the app in a state managaemnet library, and hydrating it with some initial state that was created on the server.

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
