const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//public
app.use("/", express.static("public"));

// Load all modules.
require("./modules")(app);

app.listen(PORT, () => {
  console.log(` ✔ [START] - APP INICIADO 👌`);
});
