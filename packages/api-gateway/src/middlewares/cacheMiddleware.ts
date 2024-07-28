import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  } else {
    // Override res.json method
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, body);
      return originalJson(body);
    };

    next();
  }
};
