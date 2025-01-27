const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Route 1:Get all notes "/api/notes/fetchallnotes". Login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes); 
    } catch (error) {
        res.status(500).send("server Error occured");
    }
});

// Route 2:Add a new  notes "/api/notes/addnote". Login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 2 }),
    body("description", "must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //check valiadation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saved_note = await note.save();
      res.json(saved_note);
    } catch (error) {
        console.log(error)
        res.status(500).send("server Error occured");
    }
  }
);


// Route 3:updating a existing  notes "/api/notes/updatenote". Login require
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        const {title,description,tag}=req.body;

        //cretae a newNote object
        const newNote ={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        //find the note to updated and update it
        // const note= await Notes.findByIdAndUpdate()
        let note=await Notes.findById(req.params.id)
        if(!note)
        {res.status(404).send("Not Found")}

        // if (note && note.user && note.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed")
        //   }
          
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.json({note})
    })


// Route 4:deleting a existing  notes "/api/notes/deletenote". Login require
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        // Find the note to be deleted by its ID
        const note = await Notes.findById(req.params.id);
  
        // Check if the note exists
        if (!note) {
          return res.status(404).send("Note not found");
        }
  
        // Check if the user making the request is the owner of the note
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not allowed to delete this note");
        }
  
        // Delete the note
        await Notes.findByIdAndDelete(req.params.id)
  
        // Respond with a success message
        res.json({ message: "Note deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    }
  );
  
module.exports = router;
