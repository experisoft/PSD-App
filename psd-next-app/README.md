# PSD e-commerce

> Pre-commit checks: [Husky](https://typicode.github.io/husky/) is used to run automated checks before a commit succeeds. Use git in the terminal for more detail when a commit fails.

## Getting started

Set up environment variables: use [.env.example](.env.example) as a template for a new [.env.local](.env.local)

Install and set up scripts:

```bash
npm i
npm run graphql-codegen # generate shopify api types for tsc
npm run build
```

Starting in development:

```bash
npm run dev
```

## Scripts

`npm run dev` start application with hot reload

`npm run build` make production build

`npm run start` start production build

`npm run test` run unit tests (append -- --coverage for coverage report)

`npm run format` fix all files for prettier/linting checks

## Shopify API Integration

Shopify is the the backend for this app, primerially to reduce complexity and maintenance in the future.

Using the [Storefront API Client](https://github.com/Shopify/shopify-app-js/tree/main/packages/api-clients/storefront-api-client#readme), with [@shopify/api-codegen-preset](https://github.com/Shopify/shopify-app-js/tree/main/packages/api-clients/api-codegen-preset#configuration) for type checking.
