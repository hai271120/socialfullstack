require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fileUpLoad = require('express-fileupload')
app.use(express.json())
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
app.use(cookieParser())
app.use(cors())
app.use(fileUpLoad({
    useTempFiles:true
}))
//router
 app.use('/user',require('./Route/userRouter'))
 app.use('/user',require('./Route/addinformRouter'))
 app.use("/api",require("./Route/InfluencersRouter"))
 app.use("/api",require("./Route/categoryRouter"))
 app.use("/api",require("./Route/upload"))
 app.use("/api",require("./Route/productRouter"))
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
},err=>{
    if(err) throw err;
    console.log('connent mongo');
});
if(process.env.NODE_ENV ==="production")
{
    app.use(express.static('fontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'fontend', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is runing`,PORT);
})
