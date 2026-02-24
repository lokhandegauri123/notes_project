import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
function App() {
  const [note, setNote] = useState([]);
  console.log("hello integration")
  function fetchNotes() {
    axios.get("https://notes-project-1-bro7.onrender.com/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    const {title,description}= e.target.elements;
    axios.post("https://notes-project-1-bro7.onrender.com/api/notes",{
      title: title.value,
      description : description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes();
    })
  }

  function handleDelete(noteId){
    axios.delete("https://notes-project-1-bro7.onrender.com/api/notes/"+noteId)
    .then((res)=>{
      console.log(res.data);
      fetchNotes();
    })
  }

  function handleUpdate(noteId){
    const newDesc = prompt("Enter new description");
    axios.patch("https://notes-project-1-bro7.onrender.com/api/notes/"+noteId,{description:newDesc})
    .then((res)=>{
      console.log(res.data);
      fetchNotes();
    })
  }
  return (
    <>
    <form action="" className="note-create-form" onSubmit={handleSubmit}> 
        <input type="text" name="title" id="" placeholder="enter title" />
        <input type="text" name="description" id="" placeholder="enter description" />
        <button>Create Note</button>
    </form>
      <div className="notes">
        {note.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{
                handleDelete(note._id)
              }}>Delete</button>
              <button onClick={()=>handleUpdate(note._id)}>Update</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
