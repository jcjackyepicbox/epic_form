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

  1. NodeJs - Express
  2. MongoDB

- **cosmic**

  Server side renderer for web development using NodeJs and React. Route handling using react-router and loadable to implement lazy load script files.

  Tech Stack:

  1. NodeJs - Express
  2. React
  3. Loadable
  4. React Redux
  5. React Router
  6. Webpack

- **divine** - Web Admin

  Web Platform to manage, create, and analyze forms. Create and design forms alike google forms and typeform. Analyze responses and insights from respondent answers. Account login currently only support google oauth.

  Tech Stack:

  1. React
  2. React Redux
  3. Axios

- **solace** - Micro Site (On Progress)

  Optimized for viewing forms only. Must support mobile layout and tablet layout. App will be in Single Page Application. For future reference, it will support extendable support by HTML and Javascript.

  Tech Stack:

  1. Single Page Application - Webpack
  2. React
  3. Typescript

- **star** - Library

  Library to view and build forms. Extensible to admin and microsite application. Preventing duplication over both projects.

  Tech Stack:

  1. Rollup
  2. React
