import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/usersRout.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server)

app.set("port", process.env.PORT || 9090);
app.use(cors())
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit: "4kb" , extended: true}))

app.use("/api/v1/users",userRoutes);



app.get("/home", (req, res) => {
  res.json({ res: "Root is Running...." });
});






const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://theabhisheksingh1o1:LW45PkLfVFc8Mn8z@databse.law2gyx.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log(`Server is Running on Port ${app.get("port")}`);
  });
};

start();
