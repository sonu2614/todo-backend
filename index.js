const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const clc = require("cli-color");

//console.log(process.env)

//file-import

const { userDataValidation } = require("./utils/authUtil");
const userModel =require("./models/userModel");

//constants
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(clc.yellow("MongoDB connected successfully"));
    })
    .catch((err) => {
        console.log(clc.red(err));
    });

//API
app.get("/", (req, res) => {
    return res.send("TODO App server is running");
});

app.get("/register", (req, res) => {
    //return res.send("Register Page");
    return res.render("registerPage.ejs");
});

app.post("/register", async(req, res) => {
    console.log(req.body);

    const { name, email, username, password } = req.body;

    //data validation
    try {
        await userDataValidation({ name, email, username, password });
    } catch (error) {
        return res.send({
            status: 400,
            message: "User data error",
            error: error,
        });
    }
    //check if email and username already exist or not
    //store the data in DB
    const userObj = new userModel({
        //schema :client
        name:name,
        email:email,
        username:username,
        password:password,
    })

    try {
        const userDB =await userObj.save()
        return res.send({
            status:201,
            message:"Registeration Successfull",
            data:userDB
        })
    } catch (error) {
        return res.send({
            status:500,
            message:"DataBase error",
            error:error
        });
        
    }
});

app.get("/login", (req, res) => {
    //return res.send("Login Page")
    return res.render("loginPage");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    return res.send("Login successfull");
});

// app.listen(8000,()=>{
//     console.log(clc.yellowBright("Server running"));
//     console.log(clc.yellowBright.underline(`http://localhost:${PORT}`));
// });
app.listen(8000, () => {
    console.log(
        clc.yellowBright("Server running") +
        " " +
        clc.yellowBright.underline(`http://localhost:${PORT}`)
    );
});
