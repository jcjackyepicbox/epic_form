## Universal React Application

Learning how to build react application using NodeJS to server side rendering application due to multiple page application. Using pre-rendering abilities to improve FCP time.

#### Development Environment

Due to using webpack and webpack dev middleware to build client and server application. To run dev server and enalbe HMR, you must start from the base route then navigate with browser router.

#### Production Environment

For production environment, we have a complete setup and no limitation like development env.

## Learning Steps

Here are the steps to reach complete universal react application

### Base Architecture

- [x] Client Webpack Config & Babel
- [x] Server Webpack Config & Babel
- [x] Setup Scripts (start, build, dev)
- [x] Setup Webpack Dev Middleware & Webpack Hot Middleware
- [x] Setup Webpack Build both client & server
- [x] Server Render Content at runtime

### Client Perfection

- [x] [Style] Using CSS Modules
- [x] [Style] Setup CSS for Server Rendered Content
- [ ] [async] Promise and async/await support
- [x] [async] Code Splitting support
- [x] [perf] Code Splitting and Pre-rendered Content - @loadable/component etc
- [ ] [- File] Import SVG

### Server Client Connection

- [x] Redux Provider state management
- [x] Static Routing
- [x] Routing with Code Splitting support (?)

### Testing

- [ ] Jest setup
- [ ] @testing-library/react
- [ ] Puppeteer

### Progressive Web Apps

- [ ] Enable PWA (Installable)
- [ ] Service Worker
- [ ] Caching Strategy
- [ ] Download new version(if updated)
- [ ] Push Notification (?)

### Miscellaneous

- [ ] Web Socket
- [ ] Docker

### Perfomance Metrics

- [ ] Setup Profiling Measurement Webpack Config
- [ ] Comparison to SPA
