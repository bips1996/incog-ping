import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import router from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript Express!");
// });

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
