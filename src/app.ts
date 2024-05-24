import express from 'express';
const app = express();

app.get("/",(req,res,next) => {
res.send({
    message: "hello world"
}) 
})

export default app;