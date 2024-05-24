import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";

const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {name,email,password} = req.body
    
    //validation
    if(!name || !email || !password){
        const error=createHttpError(400,"All Fields is required")
        return next(error)
    }
    //database call
    const user=await userModal.findOne({email:email})
    if(user){
        const error=createHttpError(400,"User Already Exist with this email")
        return next(error)
    }
    //process
    //response
    res.send({
        message:"User Created"
    })
};
export { createUsers };
