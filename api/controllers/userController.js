import User from '../models/userModel.js'
import cloudinary from '../utils/cloudinary.js'

export const test = (req, res) => {
    res.json({
        message : 'API is working'
    })
};

export const updateUser = async(req, res) => {
    console.log('reached update user api')
    try{
        console.log(req.body)
        const {username} = req.body;
        
        let profileUrl = req.user.profilePicture;

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            profileUrl = result.secure_url;
        }

        const userId = req.params.userId
        const updatedUser = await User.findByIdAndUpdate(userId,
            {username, profilePicture: profileUrl},
            {new : true})

            res.status(200).json({success:true, message:'Profile Updated', updatedUser})
    }
    catch(error){
        console.log('Error in updating profile : ', error)
    }
}

