const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8100;

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`app listening to port ${PORT}`));