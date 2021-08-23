const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.listen(PORT, () => console.log(`Server Started Listening at PORT ${PORT}`));

module.exports = app;