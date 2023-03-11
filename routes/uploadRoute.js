const express= require("express");
const router= express.Router();
const multer = require('multer')
const path = require('path')
const cors= require("cors");

const User= require("../models/userSchema");
const Upload = require("../models/uploadSchema");

const PORT = process.env.PORT || 3000;

router.use(cors());

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
    User.find({username: req.file.username})
    .then(response=> {
        if(response.length < 1){
            res.json({message: "Invalid username"})
            return;
        }
        else{
            const upload= new Upload({
                username: req.body.username,
                emailTo: req.body.emailTo,
                email: req.body.email,
                message: req.body.message,
                file: "localhost:" + PORT + "/" + req.file.filename
            })

            upload.save()
            .then(response=> {
        res.json({
            message: "file uploaded successfully",
           data: req.file,
           url: "localhost:" + PORT + "/" + req.file.filename,
           info: {
           email: req.body.email,
           message: req.body.message
        }
    })
            })
            .catch(err=> console.log(err));
        }
   
   })
    
});


module.exports= router;