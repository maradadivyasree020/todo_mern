const mongoose=require('mongoose')

const conn=async(req,res)=>{
    try{
        await mongoose.connect("mongodb+srv://maradadivyasree:marada@cluster0.goy56gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
        console.log("DB connected")
        })
    }
    catch(err){
        res.status(400).json({
            message:"Not Connected"
        })
    }
}
conn()