'use strict';

/* eslint-disable no-console */
const config = require('config');

const app = require('express')();

const swaggerTools = require('swagger-tools');

const serverPort = config.port;
// swaggerRouter configuration
const options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'dev'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerDoc = require('./swagger/swagger');

const errorHandler = require('./middlewares/errorHandler');

const log = require('./middlewares/log')();

app.use(log);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  // Interpret Swagger resources and attach metadata to request -
  // must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Apply errorHandler
  app.use(errorHandler);

  app.get('/', (req, res) => {
    res.redirect('/docs');
  });
  // Start the server
  app.listen(serverPort, () => {
    console.log(`Started application on localhost:${serverPort}`);
  });
});
