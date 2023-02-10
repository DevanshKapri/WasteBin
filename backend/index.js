const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const UserRoute = require('./routes/UserRoute');
const db = require('./db')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

db();

app.use('/', UserRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    }
);
