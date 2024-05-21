const express=require("express");
const app=express();
// const bodyParser = require('body-parser');
const cors=require('cors')
require("./conn")
const auth=require("./routes/auth");
const list = require("./routes/list");
const path = require("path");

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

// app.use("/api/v1",auth)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1",auth)
app.use("/api/v2",list)


app.listen(5000,()=>{
    console.log("Server is listening");
})
 
