import 'dotenv/config';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import routes from './src/routes/crmRoutes';

const app = express();
const PORT: number = 3000;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
};

connectDb();

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
