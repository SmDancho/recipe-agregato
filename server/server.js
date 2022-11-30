const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./auth/authRouter");
const favRouter = require("././addFavorite/favRouter");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/add", favRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://SmDancho:qsewad212513@reactrecipe.gyz6g9h.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
