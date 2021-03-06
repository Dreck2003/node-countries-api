const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");

require("./db.js");

const server = express();

// server.name = "API";
// const allowedOrigin = process.env.ORIGIN;
const allowedOrigin =
  process.env.ORIGIN || "https://client-countries.vercel.app/";

const options = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,POST,DELETE",
  optionsSuccessStatus: 200,
  exposedHeaders: "auth-token",
};

server.use(cors(options));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // res.hasHeader(
  //   "Access-Control-Allow-Origin",
  //   "http://localhost:3000/createActivity"
  // );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//Usamos todas las rutas
server.use("/api", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
