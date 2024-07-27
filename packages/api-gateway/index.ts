import express, { Application } from "express";
import apicache from "apicache";
import apiRoutes from "./routes";

const app: Application = express();
const cache = apicache.middleware;
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cache("3 minutes"));

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.use("/api", apiRoutes);

const server = app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

export default server;
