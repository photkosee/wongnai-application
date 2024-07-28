import express from "express";
import request from "supertest";
import { cacheMiddleware } from "../src/middlewares/cacheMiddleware";

const app = express();
app.use(express.json());
app.use(cacheMiddleware);

app.get("/test", (req, res) => {
  setTimeout(() => {
    res.json({ message: "This message should be cached" });
  }, 500);
});

describe("Cache Middleware", () => {
  test("should cache responses", async () => {
    const response1 = await request(app).get("/test");
    expect(response1.body).toEqual({ message: "This message should be cached" });

    const start = Date.now();
    const response2 = await request(app).get("/test");
    expect(response2.body).toEqual({ message: "This message should be cached" });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });
});
