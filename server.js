const express = require("express");
const config = require("config");

const app = express();

const PORT = config.get("port") || 4000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
