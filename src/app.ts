import express from "express";
import createHttpError, { HttpError } from "http-errors";
import globalErrorHandler from "./middlewares/GlobalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
const app = express();
app.use(express.json())
app.get("/", (req, res, next) => {
    const error=createHttpError(400,"Something went wrong")
    throw error
  res.send({
    message: "hello world",
  });
});
app.use("/api/users",userRouter)
app.use("api/books",bookRouter)
app.use(globalErrorHandler);

export default app;
