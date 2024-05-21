const express=require('express')
const router=express.Router();
const User=require("../models/user")
const bcrypt=require("bcrypt")

router.post("/register",async(req,res)=>{
    try{
        const {email,username,password}=req.body;
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(password,salt)
        const user=new User({email,username,password:hashPassword})
        console.log(user)
        await user.save().then(()=>res.status(200).json({message:"Sign Up Successfull"}))
    }
    catch(err){
        res.status(200).json({message:"User Already Exists"})
        console.log(err)
    }
})

// router.post('/register', async (req, res) => {
//     try {
//         const { email, username, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             email,
//             username,
//             password: hashedPassword
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'An error occurred' });
//     }
// });


router.post("/signin",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user)
        return res.status(200).json({message:"Please Sign Up first"})
        const ispassword=bcrypt.compareSync(req.body.password,user.password)
        if(!ispassword)
        return res.status(200).json({message:"Enter correct password"})
        const {password,...others}=user._doc
        return res.status(200).json({others})
    }
    catch(err){
        // res.status(400).json({message:"User Already Existed"})
        console.log(err)
    }
})

module.exports=router;