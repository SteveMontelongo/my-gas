const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`This is the start of my MyGas project!
        There will be many updates coming soon.`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});