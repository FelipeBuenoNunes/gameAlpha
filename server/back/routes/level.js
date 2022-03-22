const getLevel = require("../models/getLevel");

module.exports = (app) => {
  app.get("/getLevel", async (req, res) => {
    res.json(await getLevel(req.query.lvl));
  });
};
