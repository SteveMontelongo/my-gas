const express = require('express');
//const cors = require('cors');
const path = require('path');



const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, '../client/build')));

//app.use(cors());
//app.use(express.json());

// app.get('/', (req, res) => {
//     res.send(`This is the start of my MyGas project!
//         There will be many updates coming soon.`);
// });

app.get('/api', (req, res) => {
    res.send("This is the start of my MyGas project!");
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});