const express= require("express");
const router= express.Router();
const User= require("../models/userSchema");


router.post("/user-signup", (req, res)=> {
      User.find({username : req.body.username})
      .then(response=> {
        if(response.length > 0){
            res.json({message: "Username already exists"})
            return;
        }
        else{
           User.find({email: req.body.email})
           .then(response=> {
              if(response.length > 0){
                res.json({message: "Email already exists"})
                return; 
              }
              else{
                const user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })

                user.save()
                .then(response=> {
                    res.json({message: "User registered successfully", user: response})
                })
                .catch(err=> console.log(err))
              }
           })
           .catch(err=> console.log(err));
        }
      })
      .catch(err=> console.log(err))
})

router.post("/user-signin", (req, res)=> {
    User.find({username: req.body.username})
     .then(response=> {
            if(response.length < 1){
                res.json({message: "Invalid username/password"})
                return; 
            }
            else{
              const user= response.filter(r=> r.password === req.body.password)
              if(user.length < 1){
                res.json({message: "Invalid username/password"})
                return; 
              }
              else{
                res.json({message: "User signed in successfully"})
            }
            
            }
     })
     .catch(err=> console.log(err))
})


module.exports= router;