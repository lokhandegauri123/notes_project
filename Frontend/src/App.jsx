import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
function App() {
  const [note, setNote] = useState([]);
  console.log("hello integration")
  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    const {title,description}= e.target.elements;
    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description : description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes();
    })
  }

  function handleDelete(NoteId){
    axios.delete("http://localhost:3000/api/notes/"+NoteId)
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
