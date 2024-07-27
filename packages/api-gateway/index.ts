import express, { Application } from "express";
import apiRoutes from "./routes";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.use("/api", apiRoutes);

const server = app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

export default server;
