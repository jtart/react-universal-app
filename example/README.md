# App Example

This app is currently used for [integration and e2e testing](https://github.com/jtart/uni/tree/master/cypress/integration) of `uni`, so it has been setup to use the local code in `../`.  An `npm install` will still local `uni` deps and create a local `uni` build that is used. _(NB: this is likely only temprorary until a clearer distinction between integration app and shoecase app(s) is made.)_

The app implements an SPA and uses styled components and graphQL. It uses [Razzle](https://github.com/jaredpalmer/razzle/) to get off the ground quickly.

## Usage

Run `npm run dev`, this bundles server and client JS and starts a server on [localhost:3000/](http://localhost:3000/).

The app has 3 routes:
- `/`: a basic page with some links to the below routes
- `/styledComponents`: a page that includes styled components (just a header), with the styles being server-side rendered
- `/apollo`: a page that uses GraphQL w/ Apollo, with the data being server-side rendered
