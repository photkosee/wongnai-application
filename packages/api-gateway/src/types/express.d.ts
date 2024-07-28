import "express";

declare global {
  namespace Express {
    interface Response {
      sendResponse?: (body: any) => void;
    }
  }
}
