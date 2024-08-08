const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./Database/config");
const port = process.env.PORT || 3000;
const RegisterUser = require("./Model/RegisterUser");
const router = require("./Routes/routes");

app.use(express.json());
app.use("/", router);

db.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("An error occurred while synchronizing the models:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
