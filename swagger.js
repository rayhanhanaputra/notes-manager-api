const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Kuis API- Notes Manager",
      version: "1.0.0",
      description:
        "simple notes manager for kuis rplk with soooo many featuresss~",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Rayhan Hanaputra",
        url: "https://github.com/rayhanhanaputra",
        email: "rayhan.ramdhany@student.poltekssn.ac.id",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./app/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
