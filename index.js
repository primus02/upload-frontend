const express= require("express");
const mongoose= require("mongoose");
const Question= require("./models/questionSchema");
const bodyParser= require("body-parser");
const cors= require("cors")
const nodemailer= require("nodemailer")

const data= require("./data");
const questionRoute= require("./routes/questionsRoute");
const adminRoute= require("./routes/adminRoute");
const userRoute= require("./routes/userRoute");
const User= require("./models/userSchema");
const uploadRoute= require("./routes/uploadRoute");

const PORT = process.env.PORT || 3000;

const app= express();

app.use(bodyParser.urlencoded({ extended: true }));     
app.use(bodyParser.json())
app.use(cors());

// const mail= nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//     user: "",
//     pass: ""
//     }
// })


const connection= mongoose.connect("mongodb+srv://Honorroads:Godstimeisbest2023@cluster0.3jlbs8e.mongodb.net/?retryWrites=true&w=majority");
if(connection){
    console.log("DATABASE CONNECTED");
}

app.get("/", ( req, res )=>{
      res.send( "Welcome to the home API")
})


app.use("/", questionRoute);
app.use("/", adminRoute);
app.use("/", userRoute);
app.use("/", uploadRoute);

//use express static folder
app.use(express.static("uploads"));


app.listen(PORT, ()=> {
    console.log("Server running on port 3000")
})