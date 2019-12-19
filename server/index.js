const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});