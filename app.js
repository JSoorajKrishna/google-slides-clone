const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const {Document,Credential} = require("./models/schema");

const app = express();


const urldb = "mongodb+srv://JSoorajKrishna:12345@pollbooth.cgszb.mongodb.net/documents?retryWrites=true&w=majority";

mongoose.connect(urldb,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>app.listen(3000))
        .catch((err) =>console.log(err));



app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine","ejs");



app.get("/",(req,res) =>{
    res.render("index");
});

app.get("/login",(req,res) =>{
    res.render("login");
});

app.get("/register",(req,res) =>{
    res.render("register");
});

app.post("/register",(req,res) =>{
    let k=0;
    const details = new Credential(req.body);
    Credential.find()
            .then((result) =>{
                for(let i=0;i<result.length;i++)
                    if(req.body.email == result[i].email)
                    {
                        k++;
                        res.redirect("/register");
                        break;
                    }
                    if(k==0)
                    {
                    details.save();
                    res.redirect("/login");
                    }
            })
            .catch((err) =>{console.log(err);});
});

app.post("/login",(req,res) =>{
    let k=0;
    Credential.find()
            .then((result) =>{
                for(let i=0;i<result.length;i++)
                {
                    if(req.body.email == result[i].email)
                        {
                            if(req.body.password == result[i].password)
                        {
                            k++;
                            res.cookie("login","true");
                            res.redirect("/dashboard");
                        }
                        break;
                        }
                }
                if(k==0)
                res.redirect("/login");
            })
            .catch((err) =>{console.log(err)});
});

app.get("/dashboard",(req,res) =>{
    if(req.cookies.login)
    {
        Document.find()
            .then((result) =>{
                res.render("presentation",{result});
            })
            .catch((err) =>{
                console.log(err);
            });
    }
    else{
        res.redirect("/login");
    }
});

app.get("/dashboard/presentation",(req,res) =>{
    if(req.cookies.login)
    res.render("presentation");
    else{
        res.redirect("/login");
    }
});

app.post("/save",(req,res) =>{
    let arr = req.body.textarea0;
    let file ="";
    let content = "";

    for(let i=0;i<arr.length;i++)
    {
        content = arr[i];
        file = file + content + i;
    }
    

    const document = new Document({file});
    document.save();
    res.redirect("/dashboard");
});