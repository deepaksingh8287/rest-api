import express from "express"
import { createUsers } from "./userController";
const userRouter=express.Router();

//routes
userRouter.post("/register", createUsers)
export default userRouter