const express = require("express");
const mongoDB = require("mongoose");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const user = require("./routes/user");
const login = require("./routes/login");
const logout = require("./routes/logout");
const products = require("./routes/product");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", user);
app.use("/", login);
app.use("/", logout);
app.use("/", products);
mongoDB.set("strictQuery", false);

mongoDB.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`DB CONNECTED`);
  }
);

app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
