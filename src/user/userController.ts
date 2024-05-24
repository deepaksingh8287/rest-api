import { NextFunction, Request, Response } from "express";

const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    res.send({
        message:"User Created"
    })
};
export { createUsers };
