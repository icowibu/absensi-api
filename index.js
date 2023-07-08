import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

import * as dotenv from "dotenv";
import database from "./db/config.js";
import cookieParser from "cookie-parser";

dotenv.config();

try {
  await database.authenticate();
  console.log("database conected ...");
} catch (err) {
  err.message;
}

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    origin: true,
  })
);

app.use(routes);

// app.listen(process.env.PORT, '0.0.0.0', () => console.log(`LISTENING ON PORT ${process.env.PORT}`))
app.listen(process.env.PORT, () => {
  console.log("aplikasi berjalan pada port 4000");
});
