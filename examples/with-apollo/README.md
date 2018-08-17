# Apollo Example

This example shows an application with uni using GraphQL with Apollo.

## Usage

Clone uni, or download this directory:

```bash
curl https://codeload.github.com/jtart/uni/tar.gz/master | tar -xz --strip=2 uni-master/examples/with-apollo
cd with-apollo
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

The GraphQL data is fetched on the server if requests are made directly to routes that have styled components. If the routes are clicked through to on the client-side application, the data is fetched on the client.

There are two wrappers:

- server - sets up an Apollo client, which wraps the app on the server. GraphQL Data is then fetched. `getAdditionalHeadProps` returns a script tag which contains the GraphQL data in a serialized format
- client - sets up an Apollo client, which wraps the app on the client. This Apollo client is hydrated with data from the script tag that contains the serialized graphQL data

See [here](https://github.com/jtart/uni/blob/master/README.md#wrappers) for more information on wrappers.
