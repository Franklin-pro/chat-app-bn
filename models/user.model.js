import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName : {type: String, required: true},
    username: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    password: { type: String, required: true,minlength:6  },
    confirmPassword: { type: String, required: true,minlength:6  },
    profilePic: { type: String, default: "" }
},{timestamps:true});
 const User = mongoose.model("User", UserSchema)

 export default User
