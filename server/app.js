// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


require("dotenv").config();

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //listener
    const server = app.listen(port, () =>
      console.log(`DB connected, server is running on port ${port}`)
    );
  })
  .catch((err) => console.log("Database connection error", err));

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// routes
const testRoutes = require("./routes/userRoutes");
app.use("/", testRoutes);

// port
const port = process.env.PORT || 8080;
