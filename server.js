import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import AuthRoute from "../BlogNode/Server/Route/AuthRoute";
import blogRoute from "../BlogNode/Server/Route/blogRoute";
import mongoose from "mongoose";
import commentRoute from "./Server/Route/commentRoute"

const app = express();
dotenv.config({ path: "./.env" });
app.use(bodyparser.json());
app.use("/api/v1/blogpost", AuthRoute);
app.use("/api/v1/blogpost", blogRoute);
app.use("/api/v1/blog/comment", commentRoute);

app.use("/", (req, res) => {
  res.status(200).send({ status: 200, message: "This route does not exist" });
});
const database_url = process.env.DATABASE;
mongoose
  .connect(database_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(() => 
    console.log("db connected successfully"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
export default app;
