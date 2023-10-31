const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./Routes/auth.route");
const songRouter = require("./Routes/song.route");
const playlistRouter = require("./Routes/playlist.route");
const errorMiddleware = require("./Middlewares/error.middleware");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/playlists", playlistRouter);
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`server is running on port ${port}`);
  } catch (error) {
    console.log(`there is some problem ${error}`);
  }
});
