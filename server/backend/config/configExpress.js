const express = require("express");
const consign = require("consign");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(cors());
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  consign().include("./routes").into(app);

  return app;
};
