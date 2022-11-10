const express = require("express");
const api = require("./api");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(api);
