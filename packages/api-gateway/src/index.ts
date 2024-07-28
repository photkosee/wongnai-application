import express, { Application } from "express";
import cors from "cors";
import apiRoutes from "./routes";
import { cacheMiddleware } from "./middlewares/cacheMiddleware";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cacheMiddleware);

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.use("/api", apiRoutes);

const server = app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

export default server;
