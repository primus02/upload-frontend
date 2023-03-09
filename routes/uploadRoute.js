const express= require("express");
const router= express.Router();
const multer = require('multer')
const path = require('path')

const User= require("../models/userSchema");
const Upload = require("../models/uploadSchema");

const PORT = process.env.PORT || 3000;

// Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')  
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

router.post("/upload-file", upload.single('upload'), (req, res) => {
    // User.find({username: req.file.username})
    // .then(response=> {
    //     if(response.length < 1){
    //         res.json({message: "Invalid username"})
    //         return;
    //     }
    //     else{
    //         const upload= new Upload({
    //             username: req.body.username,
    //             emailTo: req.body.emailTo,
    //             email: req.body.email,
    //             message: req.body.message,
    //             file: 'http://127.0.0.1:3000/images/' + req.file.filename
    //         })

    //         upload.save()
    //         .then(response=> {
    //             res.json({message: "File uploaded successfully"})
    //         })
    //         .catch(err=> console.log(err));
    //     }
   
   // })
     res.json({
        data: req.file,
        url: "localhost:" + PORT + "/" + req.file.filename
    })

    // const mailOptions= {
    //     from: "drakinspip@gmail.com",
    //     to: "drakinspip@yahoo.com",
    //     subject: "Send mail via Node js",
    //     content: "Just testing!!"
    // }

    // mail.sendMail(mailOptions)
    // .then(res=> {
    //     res.json({message: "Email sent successfully"})
    // })
    // .catch(err=> console.log(err));
});


module.exports= router;