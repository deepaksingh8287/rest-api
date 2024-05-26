import mongoose from "mongoose";
import {Book} from "./bookTypes"
const bookSchema=new mongoose.Schema<Book>({
    title:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    genre:{
        type:String
    },
    coverImage:{
        type:String
    },
    file:{
        type:String
    }
    
})

const BookModal=mongoose.model<Book>("Book",bookSchema)
export default BookModal