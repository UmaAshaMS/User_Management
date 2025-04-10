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
    profilePicture : {
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEJ-8GyKlZr5ZmEfRMmt5nR4tH_aP-crbgg&s'
    }


},{timestamps: true});

const User = mongoose.model('User', userSchema)
export default User;