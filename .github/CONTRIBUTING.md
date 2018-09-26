# Contributing

Hello! Thanks for being interested in doing some cool things in `react-universal-app` and helping out! It is very much appreciated. This will help you get started.

## Project Structure

`react-universal-app` is a simple project with not too many moving parts. The following is a description of each directory in the project:

- `.circleci` - config for the [Circle CI build setup](https://circleci.com/gh/jtart/react-universal-app)
- `cypress` - integration tests using the awesome [Cypress.io](https://www.cypress.io/)
- `examples` - examples of applications built with the latest version of `react-universal-app` on NPM
- `integration` - an application used for integration tests using local `react-universal-app` files
- `src` - where all the magic happens
- `test` - setup for Jest unit tests

## Project choices

The following describes libraries, techniques or tools that `react-universal-app` uses:

- unit & snapshot tests - Jest & Enzyme
- integration tests - Cypress using a production build
- code standards - Prettier and CodeClimate - [link to CodeClimate project](https://codeclimate.com/github/jtart/react-universal-app/)
- code coverage - Coveralls - [link to project](https://coveralls.io/github/jtart/react-universal-app)
- production build creation - Rollup via Microbundle
- CI - Circle CI. A CI build runs unit and integration tests for each commit to a PR - [link to build](https://circleci.com/gh/jtart/react-universal-app)

## Local Development

To do some local development of `react-universal-app`, follow these steps:

1. Fork the repo to your GitHub account, clone it locally
2. Checkout a new branch for your feature (it is a good idea to not work directly on the default branch)
3. Install node packages - `npm install`
4. Run a dev build of `react-universal-app` that will watch for changes - `npm run dev`
5. Setup and run a dev build of the integration application. This will install and run the integration app packages using the local `react-universal-app` files.

```bash
cd integration
npm install
npm run dev
```

5. Write some code
6. Write some tests; unit/snapshot tests may suffice, or write some integration tests
7. Push your changes!

NB: hot module reloading does not _too_ work well between making changes in `react-universal-app` and them being reflected in the integration application; you may need to manually restart it.

### Commands

The following are commands that are available and useful for local development:

- `npm run dev` - runs a dev build of `react-universal-app` that watches for changes
- `npm test` - runs unit tests that watches for changes
- `npm run test:e2e` - runs integration tests
- `npm run test:e2e:interactive` - runs integration tests in Cypress interactive mode

## Examples

Adding example applications is most welcome! You should fork off the [basic example](https://github.com/jtart/react-universal-app/tree/master/examples/basic) for consistency and simplicity. The basic example uses [Razzle](https://github.com/jaredpalmer/razzle), which should provide enough application scaffolding to get you off the ground.

The examples aren't so much about the code that is written, but more about **the idea behind the example**.

Please submit an example that is:

- as singular and minimal as possible in its scope
- is consistently named, i.e. `with-[thing]`
- be documented in it's intention and implementation

## Contact

- Tweet/DM - [@jordantart](https://twitter.com/jordantart)
- Email - <jordan.tart3@gmail.com>
