const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("../config/config");
const port = config.port || 3000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "A simple Express API",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: [
    "./routes/index.js",
    "./routes/user/index.js",
    "./routes/process/index.js",
    "./routes/fileRoutes/index.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true, // Enable Swagger UI Explorer
      swaggerOptions: {
        docExpansion: "list", // Default to expanding all endpoints
        defaultModelsExpandDepth: -1, // Default to not expanding models
        filter: true, // Enable filtering
        showRequestHeaders: true, // Show request headers
      },
    })
  );
};
