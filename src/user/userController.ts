import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
const createUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //validation

    if (!name || !email || !password) {
        const error = createHttpError(400, "All Fields is required");
        return next(error);
    }

    //database call
    try {
        const user = await userModal.findOne({ email: email });
        if (user) {
            const error = createHttpError(
                400,
                "User Already Exist with this email"
            );
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting users data."));
    }

    //password=>hash
    let newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        newUser = await userModal.create({
            name,
            email,
            password: hashedPassword,
        });
        //token generation=>jwt
    } catch (error) {
        return next(createHttpError(500, "Error while creating user."));
    }
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "7d",
    });
    //process
    //response
    res.status(201).json({
        accessToken: token,
    });
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = createHttpError(400, "All Fields is required");
        return next(error);
    }
    const user = await userModal.findOne({ email: email });
    if (!user) {
        return next(createHttpError(404, "User not found"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(createHttpError(401, "Invalid Credentials"));
    }
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
        expiresIn: "7d",
    });
    return res.json({
        token,
    });
};
export { createUsers, loginUser };
