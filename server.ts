import app from "./src/app"
import {config} from "./src/config/config"
import connectDb from "./src/config/db"
const startServer = () =>{
    const port=config.port || 3000
    app.listen(port,async ()=>{
        connectDb()
        console.log(`server is running on port ${port}`)
    })
}
startServer()