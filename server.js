'use strict';

const app = require('express')();
const swaggerTools = require('swagger-tools');

const serverPort = 3000;

// swaggerRouter configuration
const options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'dev'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerDoc = require('./swagger.json');

const errorHandler = require('./middlewares/errorHandler');

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

  app.use(errorHandler);
  // Start the server
  app.listen(serverPort, () => {
    console.log(`Started application on localhost:${serverPort}`);
  });
});
