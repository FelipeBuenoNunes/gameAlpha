const express = require("express");
const app = express();

app.use("/", express.static("./pages/home"));
app.use("/game", express.static("./pages/game"));
app.use("/stage", express.static("./pages/stageSelect"));

app.listen(8000);
