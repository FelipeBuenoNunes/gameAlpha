const express = require('express');
const app = express();

app.use("/", express.static('./pages/home'));
app.use("/game", express.static('./pages/game'));

app.listen(8000);