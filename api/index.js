require("dotenv").config();
const express = require("express");
const router = require("./routes/product");
const connectDB = require("./connection/connect");
const cors = require("cors");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use(cors());
app.use("/", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server is listening ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
