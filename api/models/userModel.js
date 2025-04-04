import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {
        type:String
    },
    email : {
        type: String,
        unique:true,
        required :true,
    },
    password : {
        type:String,
        required : true,
    },
    status : {
        type : Boolean
    },


},{timestamps: true});

const User = mongoose.model('User', userSchema)
export default User;