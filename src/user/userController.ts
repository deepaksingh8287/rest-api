import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";
import bcrypt from "bcrypt";
import {sign}  from "jsonwebtoken"
import { config } from "../config/config";
const createUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //validation

  if (!name || !email || !password) {
    const error = createHttpError(400, "All Fields is required");
    return next(error);
  }

  //database call

  const user = await userModal.findOne({ email: email });
  if (user) {
    const error = createHttpError(400, "User Already Exist with this email");
    return next(error);
  }

  //password=>hash

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModal.create({
    name,
    email,
    password: hashedPassword,
  });
  //token generation=>jwt
  const token=sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:"7d"})
  //process
  //response
  res.json({
    accessToken:token,
  });
};
export { createUsers };
