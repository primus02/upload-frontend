const mongoose= require("mongoose");

const uploadSchema= mongoose.Schema({
    "username": {type: String, required: true},
    "emailTo": {type: String, required: true},
    "email": {type: String, required: true},
    "message": {type: String, required: true},
    "file": {type: String, required: true}
});

module.exports= mongoose.model("Uploads", uploadSchema);