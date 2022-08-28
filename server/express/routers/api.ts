import { Router } from "express";



const api = Router();

api.get("/hello", (_req, res) => {
  res.send({ message: "Hello" });
})

export default api;
