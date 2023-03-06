import bodyParser from 'body-parser';
import express from 'express'
import DBConnection from './db/db.js';
import routes from './routes/routes.js';

import * as dotenv from 'dotenv'
dotenv.config()

// DBConnection.connect()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes)

// app.listen(process.env.PORT, '0.0.0.0', () => console.log(`LISTENING ON PORT ${process.env.PORT}`))
app.listen(process.env.PORT, () => {
    console.log("aplikasi berjalan pada port bla bla bla")
})