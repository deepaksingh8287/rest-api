import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { Multer } from "multer";
import path, { dirname } from "path";
import createHttpError from "http-errors";
import bookModal from "./bookModal";
import fs from "node:fs";
import { AuthRequest } from "../middlewares/authenticate";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const body={...req.body}
    const { title , genre } =  body
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype?.split("/").at(-1);
    const filename = files.coverImage[0].filename;
    const filepath = path.resolve(
        __dirname,
        "../../public/data/uploader",
        filename
    );
    const uploadResult = await cloudinary.uploader.upload(filepath, {
        filename_override: filename,
        folder: "book-covers",
        format: coverImageMimeType,
    });
    try {
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploader",
            bookFileName
        );
        const bookUploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                filename_override: bookFileName,
                folder: "book-pdfs",
                format: "pdf",
                resource_type: "raw",
            }
        );
        try {
            const _req=req as AuthRequest
        const newBook = await bookModal.create({
            title,
            genre,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: bookUploadResult.secure_url,
        });  
        
        //delete files
        fs.promises.unlink(filepath);
        fs.promises.unlink(bookFilePath);
        return res.status(201).json({});
        } catch (error) {
            console.log("err",error)
            next(createHttpError(400,"Error in modal"))
        }
    } catch (error) {
        next(createHttpError(500, "Error while file uploading"));
    }
};
export { createBook };
