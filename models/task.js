const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const TaskSchema = new mongoose.Schema({
    name:{
        
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[100, 'name cannot be more than 100 characters']
    },
    completed:{
        type:Boolean,
        default:false
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required:true
    }
   

})
const userSchema = new mongoose.Schema({

    name:String,
    username:{
        type: String,
        required: true,
        unique: true
    },
   
    password: String
});
const users = mongoose.model("users",userSchema);

const model = mongoose.model('task',TaskSchema)

module.exports = {model ,users}