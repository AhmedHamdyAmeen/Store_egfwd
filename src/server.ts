import express, { Application, Request, Response } from "express";
import Error from "./MVC/Interfaces/error";

import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { PORT } from "./config";
import db from "./database/database";
import routes from "./MVC/Routes/routes";
import { Client } from "pg";

/**----------------------**
 * Initiate Express Server
 */
const app: Application = express();

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});

/**-------------------**
 *  Helper Variables
 */

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Limit each IP
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many request to this IP, please try again after 1 minute! 😥🤷‍♀️",
});

// Test DB
// db.connect().then((client) => {
//   return client
//     .query("SELECT NOW()")
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack);
//     });
// });

/**-----------------------**
 *  Endpoints
 */

app.use(express.static("public"));
app.use(express.json()); // parses incoming requests with JSON payloads
// app.use(express.urlencoded({ extended: false }));

// Use to limit repeated requests to public APIs and/or endpoints
app.use(limiter);
app.use(helmet()); // to Securing http requests
app.use(morgan("dev"));
app.use(cors());
app.use(routes);

/** Not found MW
 */

app.use((req: Request, res: Response) => {
  console.log(`Not Found MW: \n`);
  res.status(404).json({ msg: `Not Found` });
});

/** Error MW
 */
app.use((err: Error, req: Request, res: Response) => {
  console.log(`Error MW: \n`);
  const status = err.status || 500;
  res.status(status).json({ msg: `${err}` });
});

export default app;
