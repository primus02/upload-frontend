const mongoose= require("mongoose");

const questionSchema= mongoose.Schema({
    "question": {type: String, required: true},
    "options": [String],
    "answer": {type: String, required: true} 
});

module.exports= mongoose.model("Questions", questionSchema);