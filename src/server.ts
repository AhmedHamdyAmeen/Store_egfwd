// import dotenv from "dotenv";
// dotenv.config();
import {} from "dotenv/config";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "./MVC/Routes/routes";

const app: Application = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});

/**-----------------------**
 *  Endpoints
 */
app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

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
  res.status(500).json({ msg: `${err}` });
});

export default app;
