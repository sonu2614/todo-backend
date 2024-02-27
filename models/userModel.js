const mongoose =require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unquie:true,
        required:true,
        lowercase:true
    },
    username:{
        type:String,
        unquie:true,
        required:true,
    },
    password:{
        type:String,
        required:true

    }
});

module.exports = mongoose.model('User',userSchema);

// const varModel = mongoose.model('User',userSchema);
// module.exports = varModel;
