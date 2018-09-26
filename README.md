# react-universal-app

[![Greenkeeper](https://badges.greenkeeper.io/jtart/react-universal-app.svg)](https://greenkeeper.io/)
[![Code Coverage](https://coveralls.io/repos/github/jtart/react-universal-app/badge.svg?branch=master)](https://coveralls.io/github/jtart/react-universal-app?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jtart/react-universal-app/badge.svg)](https://snyk.io/test/github/jtart/react-universal-app)
[![gzip size](http://img.badgesize.io/https://unpkg.com/react-universal-app/dist/react-universal-app.es.js?compression=gzip)](https://unpkg.com/react-universal-app/dist/react-universal-app.es.js)
[![CircleCI status](https://circleci.com/gh/jtart/react-universal-app.svg?style=svg)](https://circleci.com/gh/jtart/react-universal-app)

react-universal-app is a library that enables the building of a single-page application with universal React components and React Router.

## Project goals

The goals of react-universal-app are very simple:

- Simplicity in building an SPA with universal React components
- Flexibility in building an SPA with universal React components

**Simplicity**

react-universal-app provides 2 React components:

1. for the server, just pass it some initial data and routes, and render the thing
2. for the client, just pass it the data your rendered on the serve and the same routes you passed to the server component, and hydrate the thing

It also provides a single data-fetching API. This data-fetching API is defined next to your your routes.

**Flexibility**

react-universal-app doesn't do much.

It gives you a couple of React components for rendering your routes, and doesn't force you to render or hydrate your app in any particular way. You can render however you want!

It gives you a single data-fetching API, which is defined on your routes. This means you can build your app components in anyway you want, and your React components are just React components.

## Getting Started

To get started quickly, view the [example applications](https://github.com/jtart/react-universal-app/tree/master/examples). These applications give an example of how you might create an application using react-universal-app.

Alternatively, follow the steps below to get started.

### Installation

```bash
npm install react-universal-app react
```

### App

The following gives information on how to setup routing and data fetching in your main React application. Once you have setup your routes, you can pass them to React components that react-universal-app provides for server-side rendering and client-side hydration.

#### Routing

react-universal-app uses React Router 4, which is a great foundation for serving pages as components and providing route configuration. To define your routes, create some [route configuration](https://www.npmjs.com/package/react-router-config#route-configuration-shape) and export them.

Note: react-universal-app currently only supports a single top-level of routing.

```JavaScript
// ./app/routes.js
import Home from './components/Home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
];

export default routes;
```

```JavaScript
// ./app/components/Home.js

const Home = () => (
  <div>
    <h1>Home!</h1>
  </div>
)

export default Home;
```

#### Data Fetching

react-universal-app provides a very familiar `getInitialData` for data fetching, which is defined in the route configuration.

This provides a clear seperation of concerns and agnosticism between route configuration/data fetching and components. Your React components are just React components, and you can swap components on routes as much as you please.

This has an implicit benefit of reducing the barrier to entry for development for new React developers as the flow of data in the application is clear and defined.

##### `await getInitialData(ctx): { data }`

`getInitialData` is an **optional** asynchronous function that is defined on the configuration of a route. This API is used for fetching data from an external API, or just returning some initial data to a route's component based on some other variable.

A `ctx` object is passed to `getInitialData`, which includes:

- `match` - React Router's [match](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md) object

On the server, `getInitialData` is called explicitly by you through `loadInitialData` (see below), with the response passed to the server component.

On the client, it is called internally and the returned data is passed to the route's defined component. On the client, react-universal-app has 3 states in the lifecycle of `getInitialData` that are passed to the route's component:

- `loading` (`boolean`) - `loading` will be `true` if `getInitialData` has not responded yet, probably because it is busy fetching from your API. Otherwise, it is `false`
- `data` (`object`) - once react-universal-app has your data, it will be passed in the `data` prop. Otherwise, it is `null`
- `error` (`Error`) - if the process for getting your initial data throws an error, it will be passed to your component to handle. Otherwise, it is `null`

```JavaScript
// app/routes.js
import Home from './components/Home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    getInitialData: await (ctx) => {
      return { title: 'Home!' };;
    },
  },
];

export default routes;
```

```JavaScript
// app/components/Home.js

const Home = ({ loading, error, data }) => {
  if(loading) return 'Loading...'
  if(error) return 'Oh no, something went wrong!'
  if(data) {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    )
  }
};

export default Home;
```

#### Parameterized Routing

react-universal-app supports parameterized routing from `react-router`. As data fetching is defined on the route, parameterized routing is a breeze, and can be handled very cleanly.

```JavaScript
// ./app/routes.js
import Home from './components/Home';

const routes = [
  {
    path: '/:id',
    exact: true,
    component: Home,
    getInitialProps: await ({ match }) => {
      const { id } = match.params;
      const response = await fetch(`/someApi/${id}`);
      const apiResponse = await response.json();

      return { title: 'Home!', apiResponse };;
    },
  },
];

export default routes;
```

```JavaScript
// ./app/components/Home.js

const Home = ({ loading, error, data }) => {
  if(loading) return 'Loading...'
  if(error) return 'Oh no, something went wrong!'
  if(data) {
    const { title, apiResponse } = data;
    return (
      <div>
        <h1>{title}</h1>
        {
          apiResponse.map(({ title, description }) => (
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))
        }
      </div>
    )
  }
};

export default Home;
```

### Server

For rendering your app on a server, react-universal-app provides you a React component and a data-fetching API. react-universal-app _could_ fetch the initial data internally for you if it was more opinionated. However, react-universal-app doesn't make any assumptions about how or where you will render your React application on the server, so it can't! Read [Client](#client) for a clear example of why not.

Then, take a look at [`ReactDOMServers`'s methods](https://reactjs.org/docs/react-dom-server.html) for rendering a React application on a server!

#### await loadInitialData(url, routes): { data }

`loadInitialData` is an **optional** asynchronous function that matches the route based on the passed URL, calls `getInitialData`, and returns the response. If the route does not have a `getInitialData` an empty object will be returned. Takes the following arguments:

- `url` (`string`) - a [Node.JS HTTP URL-like object](https://nodejs.org/api/http.html#http_message_url)
- `routes` (`array`) - React Router routes

#### <ServerApp />

A React component that renders a route with some initial data. Takes the following props:

- `url` (`string`) - a [Node.JS HTTP URL-like object](https://nodejs.org/api/http.html#http_message_url)
- `routes` (`array`) - React Router routes
- `data` (`object`) - **optional** initial data from `loadInitialData` that is passed to the route's component
- `routerContext` (`object`) - React Router's [StaticRouter `context` object](https://reacttraining.com/react-router/web/guides/server-rendering)

### Client

To hydrate your React application on a client, react-universal-app provides a React component. You must then call `react-dom`'s `hydrate` method

The client-side application needs access to the data that was used to render the application on the server, and so should be injected into the HTML document that the server wrapped the rendered React application in and sent to the client. This data could be inside a `script` tag, that injects the data onto the global `window` object, like so:

```JavaScript
<script>
  window.__APP_DATA__ = data;
</script>
```

Then, take a look at [`ReactDOM`'s methods](https://reactjs.org/docs/react-dom.html) for hydrating a React application on a client!

#### <ClientAPp />

A React component that renders your routes and application on the client. Takes the following props:

- `routes` (`array`) - React Router routes
- `data` (`object`) - **optional** initial data from `loadInitialData` that is passed to the route's component
