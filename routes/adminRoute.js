const express= require("express");
const router= express.Router();
const Admin= require("../models/adminSchema");


router.post("/admin-signup", (req, res)=> {
      Admin.find({username : req.body.username})
      .then(response=> {
        if(response.length > 0){
            res.json({message: "Username already exists"})
            return;
        }
        else{
           Admin.find({email: req.body.email})
           .then(response=> {
              if(response.length > 0){
                res.json({message: "Email already exists"})
                return; 
              }
              else{
                const admin = new Admin({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })

                admin.save()
                .then(response=> {
                    res.json({message: "Admin registered successfully", admin: response})
                })
                .catch(err=> console.log(err))
              }
           })
           .catch(err=> console.log(err));
        }
      })
      .catch(err=> console.log(err))
})

router.post("/admin-signin", (req, res)=> {
     Admin.find({username: req.body.username})
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
                res.json({message: "Admin signed in successfully"})
            }
            
            }
     })
     .catch(err=> console.log(err))
})


module.exports= router;