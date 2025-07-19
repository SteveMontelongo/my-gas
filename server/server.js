const express = require('express');
require('dotenv').config();
//const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT;


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      dbName: 'mygasdb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas via Mongoose"))
  } catch (e) {
    console.error('❌ MongoDB connection error:', e);
    process.exit(1);
  }
}

connectDB();


app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
const authRouter = require('./routes/auth');
const { configDotenv } = require('dotenv');
app.use('/api', authRouter);
//app.use(cors());
//app.use(express.json());

// app.get('/', (req, res) => {
//     res.send(`This is the start of my MyGas project!
//         There will be many updates coming soon.`);
// });

// app.get('/api', (req, res) => {
//     res.send("Welcome to GasNearby! Many updates are coming soon!");
//   });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});