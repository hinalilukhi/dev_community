require("dotenv").config();
const express=require("express")
const app=express()
const connectdB=require("./config/db")
var cors = require('cors');
const path=require("path")
app.use(cors());
app.use(express.json())


connectdB()
app.use("/api/users",require('./routes/api/user'))
app.use("/api/password-reset", require('./routes/api/passwordReset'));
app.use('/api/posts',require('./routes/api/post'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    })
}

const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
