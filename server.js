const express = require("express");
const prometheus = require("prom-client");
const cors = require("cors");

const swagger = require("./swagger");

const winston = require("winston");
const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and Resync Db");
  // initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to notes manager app." });
});

// Setup Prometheus for monitoring API
prometheus.collectDefaultMetrics();
app.get("/metrics", async (req, res) => {
  try {
    const metrics = await prometheus.register.metrics();
    res.set("Content-Type", prometheus.register.contentType);
    res.end(metrics);
  } catch (error) {
    console.error("Error generating metrics:", error);
    res.status(500).send("Internal Server Error");
  }
});

// routes
require("./app/routes/auth.route")(app);
require("./app/routes/note.route")(app);

swagger(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info("server started...");
});

function initial() {
  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "user",
  });
}
