import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

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
    //process
    //response
    res.send({
        message:"User Created"
    })
};
export { createUsers };
