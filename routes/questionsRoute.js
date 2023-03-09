const express= require("express");
const router= express.Router();
const Question= require("../models/questionSchema");



router.post("/post-questions", (req, res)=> {
    console.log("Body", req.body)
     /*  const question= new Question({
           question: req.body.question,
           options: req.body.options,
           answer: req.body.answer
       })


       question.save()
       .then(response=> {
        res.status(201).json({message: "data posted successfully", data: response})
       })
       .catch(er
        r=> console.log(err))
       */

        data.forEach(q=> {
            const question= new Question({
                question: q.question,
                options: q.options,
                answer: q.answer
            })

            question.save()
            .then(response=> {
             res.status(201).json({message: "data posted successfully", data: response})
            })
            .catch(err=> console.log(err))
        })
})

router.get('/questions', (req, res)=> {
    Question.find()
    .then(response=> res.json({message: "Questions found successfully", NoOfQuestion: response.length, data: response}))
    .catch(err=> console.log(err))
})


module.exports= router;