const express=require('express')
const router=express.Router();
const User=require("../models/user")
const List=require("../models/list")
const mongoose = require('mongoose'); 
const { param } = require('./auth');

router.post("/addTask",async(req,res)=>{
    try{
        const {title,body,id}=req.body;
        const existingUser=await User.findById(id)
        console.log(id)
        if(existingUser){
            const list=new List({title,body,user:existingUser})
            await list.save().then(()=>res.status(200).json({list}))
            existingUser.list.push(list);
            existingUser.save();
        }
    }
    catch(err){
        console.log(err)
    }
}) 

router.put("/updateTask/:id",async(req,res)=>{
    try{
        const {title,body}=req.body;
        const list=await List.findByIdAndUpdate(req.params.id,{title,body})
        .then(()=>res.status(200).json({message:"Task Updated"}))
        console.log(title,body,list)
    }
    catch(err){
        console.log(err)
        // return res.status(500).json({ message: "An error occurred" });
    }
})


// router.put("/updateTask/:id", async (req, res) => {
//     try {
//         const { title, body, email } = req.body;
//         const { id } = req.params;
//         // console.log("ID:", id);
//         // console.log("Request Body:", req.body);
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             console.log("Invalid ID format");
//             return res.status(400).json({ message: "Invalid ID format" });
//         }
//         const existingUser = await User.findOne({ email }).populate('list');
//         if (!existingUser) {
//             console.log("User not found");
//             return res.status(404).json({ message: "User not found" });
//         }
//         // console.log("Existing User:", existingUser);
//         const task = existingUser.list.find(task => task._id.toString() === id);
//         if (!task) {
//             console.log("Task ID not found in user's list");
//             return res.status(404).json({ message: "Task not found" });
//         }
//         task.title = title;
//         task.body = body;
//         await task.save();
//         return res.status(200).json({ message: "Task Updated", list: task });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "An error occurred" });
//     }
// });

router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {id}=req.body;
        const existingUser=await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}})
        console.log(existingUser)
        if(existingUser){
            // const {id}=req.params;
            await List.findOneAndDelete(req.params.id).then(()=>res.status(200).json({message:"TaskDeleted"}))
            // console.log(id,existingUser._id)
            // console.log(list)
            // if (!list)
            // return res.status(404).json({ message: "Task not found" });
            // else
            // return res.status(200).json({ message: "Task Updated", list });
        } 
        else 
        return res.status(404).json({ message: "User not found" });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: "An error occurred" });
    }
})

router.get("/getTasks/:id",async(req,res)=>{
    const list=await List.find({user:req.params.id}).sort({createdAt:1})
    if(list.length!==0)
    res.status(200).json({list});
    else
    res.status(200).json({message:"No Tasks"});
})

module.exports=router;
