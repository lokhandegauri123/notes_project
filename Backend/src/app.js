const express = require("express")
const app = express()
const noteModel = require("./models/notes.model")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
const path = require("path")
// post = create new data
app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body;
    const notes = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message: "note created",
        notes
    })
})

// get = fetch all the data from api 
app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find();

    res.status(200).json({
        message: "fetched successfully",
        notes
    })
})

// delete  /api/notes/:id
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "note deleted successfully",
        
    })
})

// patch 
// update the desc of notes
// req.body = {description}
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(id,{description});
     
    res.status(200).json({
        message: "note updated"
    })  
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/src/public/index.html"));
})
module.exports = app