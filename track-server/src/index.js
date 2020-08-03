require("./model/usermodel");
require("./model/trackmodel");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoutes");
const trackRoute = require("./routes/trackRoutes");

const requireAuth = require("./middleware/requireAuth");
const app = express();

app.use(bodyParser.json());
app.use(authRoute);
app.use(trackRoute);

const mongoStart = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://subhash:subhash@shopping-btf66.gcp.mongodb.net/usertrack",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    console.log(
      `Successfully connected to tracker mongo database with the URL `
    );
  } catch (err) {
    console.log(err);
  }
};

app.get("/", requireAuth, (req, res) => {
  res.send("Hi there ");
});

app.listen(4000, () => {
  mongoStart();
  console.log(`Application is running at port 4000`);
});
