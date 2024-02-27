const express =require('express');
require('dotenv').config();
const mongoose =require('mongoose')
const clc = require("cli-color");

//console.log(process.env)




//constants
const app = express();
const PORT=process.env.PORT;




//Middlewares
app.set("view engine","ejs");
app.use(express.urlencoded({extended :true}))




//DB connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(clc.yellow("MongoDB connected successfully"));
})
.catch((err)=>{
    console.log(clc.red(err));
});




//API
app.get('/',(req,res)=>{
    return res.send("TODO App server is running");
});

app.get('/register',(req,res)=>{
    //return res.send("Register Page");
    return res.render("registerPage.ejs")
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    return res.send("Registeration successfull")
})

app.get('/login',(req,res)=>{
    //return res.send("Login Page")

    const {name, email, username,password}=req.body

    //data validation
    //check if email and username already exist or not
    //store the data in DB
    
    return res.render("loginPage")
    
});

app.post('/login',(req,res)=>{
    console.log(req.body);
    return res.send("Login successfull")
})



// app.listen(8000,()=>{
//     console.log(clc.yellowBright("Server running"));
//     console.log(clc.yellowBright.underline(`http://localhost:${PORT}`));
// });
app.listen(8000, () => {
    console.log(clc.yellowBright("Server running") + ' ' + clc.yellowBright.underline(`http://localhost:${PORT}`));
});














