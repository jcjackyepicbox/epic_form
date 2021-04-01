## Universal React Application

Build react application using NodeJS to server side rendering application due to supporting multiple page application from scratch.

### Development

```
yarn dev
```

### Production

```
yarn build
yarn start
```

### Folder Structure

We use monorepo to manage all related epicforms system.

- **api**

  Built with NodeJs Express framework and using **backpack** as build system.

  Tech stack:

  - NodeJs - Express
  - MongoDB

- **cosmic** - Dashboard main app

  Server side renderer for web development using NodeJs and React. Route handling using react-router and loadable to implement lazy load script files.

  Web Platform to manage, create, and analyze forms. Create and design forms alike google forms and typeform. Analyze responses and insights from respondent answers. Account login currently only support google oauth.

  Future approach: Different domain for company website and dashboard admin.

  Tech Stack:

  - NodeJs - Express
  - React
  - Loadable
  - React Redux
  - React Router
  - Webpack

- **solace** - Micro Site

  Optimized for viewing forms only. Must support mobile layout and tablet layout. App will be in Single Page Application. For future reference, it will support extendable support by HTML and Javascript.

  Tech Stack:

  - Single Page Application - Webpack
  - React
  - Typescript

- **divine** - Library

  Library to view and build forms. Extensible to admin and microsite application. Preventing duplication over both projects.

  Tech Stack:

  - Rollup
  - React
