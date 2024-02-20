import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import router from "./routes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", router);
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
