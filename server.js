const express = require("express");
const cors = require("cors");

const app = express();
const porta = 3999;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//public
app.use("/portifolio", express.static("public"));

// Load all modules.
require("./modules")(app);

app.listen(porta, () => {
  console.log(` ✔ [START] - APP INICIADO NA PORTA ${porta} 👌`);
});
