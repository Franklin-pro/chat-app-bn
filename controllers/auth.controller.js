import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";


export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      // If user is not found, return an error response early
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Compare password only if user exists
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (isPasswordCorrect) {
        generateTokenAndCookie(user._id, res);
        res.status(200).json({ message: "User logged in successfully", user });
      } else {
        res.status(400).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.log("Error in login controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
export const register = async(req, res)=>{
    try {
        const {fullName,gender,username, password,confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            await generateTokenAndCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({message: "User created successfully",newUser})
        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("error in sign up controller",error.message)
        res.status(500).json({error: "internal server error"})  
    }
}

export const logout =(req, res)=>{
try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "User logged out successfully"})
} catch (error) {
    console.log("error in logout controller", error.message)
    res.status(500).json({error: "internal server error"})
}

}