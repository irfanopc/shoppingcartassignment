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
const Product = require('./models/product')
const PurchaseHistory =  require('./routes/purchasehistory')
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", user);
app.use("/", login);
app.use("/", logout);
app.use("/", products);
app.use("/", PurchaseHistory);
const fs = require('fs')
mongoDB.set("strictQuery", false);
const jsonData = JSON.parse(fs.readFileSync('./data.json','utf-8'))
mongoDB.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {

    console.log(`DB CONNECTED`);
  }
);
// app.get('/',(req,res)=>{
//   res.json('hai')
// })
const importData =async()=>{
try {
  await Product.create(jsonData);
  console.log('data added successfully');
  process.exit()
} catch (error) {
  console.log(error);
}
}
 //importData()
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
