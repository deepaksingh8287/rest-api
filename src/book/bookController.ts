import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { Multer } from "multer";
import path, { dirname } from "path";
import createHttpError from "http-errors";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log("req", req.files);
    const files=req.files as {[fieldname: string]:Express.Multer.File[]}
    const coverImageMimeType=files.coverImage[0].mimetype?.split("/").at(-1)
    const filename=files.coverImage[0].filename
    const filepath=path.resolve(__dirname,"../../public/data/uploader",filename)
    const uploadResult=await cloudinary.uploader.upload(filepath,{
        filename_override:filename,
        folder:"book-covers",
        format:coverImageMimeType
    })
    try {   
    const bookFileName=files.file[0].filename
    const bookFilePath=path.resolve(__dirname,"../../public/data/uploader",bookFileName)
        const bookUploadResult=await cloudinary.uploader.upload(bookFilePath,{
            filename_override:bookFileName,
            folder:"book-pdfs",
            format:"pdf",
            resource_type:"raw"
        })
        console.log("book upload",bookUploadResult)
        
    console.log("upload result",uploadResult,)
    return res.json({});
    } catch (error) {
        next(createHttpError(500,"Error while file uploading"))
    }
    
};
export { createBook };
