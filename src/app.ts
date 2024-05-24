import express from "express";
import createHttpError, { HttpError } from "http-errors";
import globalErrorHandler from "./middlewares/GlobalErrorHandler";
import userRouter from "./user/userRouter";
const app = express();

app.get("/", (req, res, next) => {
    const error=createHttpError(400,"Something went wrong")
    throw error
  res.send({
    message: "hello world",
  });
});
app.use("/api/users/",userRouter)
app.use(globalErrorHandler);

export default app;
