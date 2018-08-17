# Styled Components Example

This example shows an application with uni using styled-components.

## Usage

Clone uni, or download this directory:

```bash
curl https://codeload.github.com/jtart/uni/tar.gz/master | tar -xz --strip=2 uni-master/examples/with-styled-components
cd with-styled-components
```

Then run:

```bash
npm install
npm run dev
# OR
yarn
yarn dev
```

A server will be started on [localhost:3000](http://localhost:3000/).

The styles are server-side rendered if requests are made directly to routes that have styled components. If the routes are clicked through to on the client-side application, the styles are client-side rendered.

There is a single server-side wrapper. This wrapper wraps the app in a styled-components API that collects styles. `getAdditionalHeadProps` returns a style element component from the collected styles.

See [here](https://github.com/jtart/uni/blob/master/README.md#wrappers) for more information on wrappers and `getAdditionalHeadProps`.
