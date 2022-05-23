import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";
import "dotenv/config";

const app = express();
const PORT = 3000;

const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.q9pfz.mongodb.net/?retryWrites=true&w=majority`;

async function loadDb() {
  try {
    await mongoose.connect(mongodbUrl);
  } catch (err) {
    console.log(err);
  }
}

loadDb();

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
