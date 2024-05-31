import {config as conf} from "dotenv"
conf()
const _config={
    port:process.env.PORT ,
    databaseURL:process.env.MONGODB_CONNECTION_STRING,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SCRET
}
export const config=Object.freeze(_config)