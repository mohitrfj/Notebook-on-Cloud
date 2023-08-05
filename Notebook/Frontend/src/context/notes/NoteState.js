import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const { showAlert } = props

  //Get all notes
  const getNotes = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  };


  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log(response.json)
    showAlert("Note Added!", "success")
    // console.log("Adding a new note");
    // const note = {
    //   "_id": "61322f119553fva8ca8d0e08",
    //   "user": "6131dc5e3e4037cd4734a0664",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-09-03T14:20:09.668Z",
    //   "__v": 0,
    // };
    // setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    console.log("Delete node with id: ", id)
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    console.log(response.json)
    showAlert("Note Deleted!", "success")
    // const json = response.json();
    // const newNotes = notes.filter((note) => { return note._id !== id })
    // setNotes(newNotes)
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log(response.json)
    showAlert("Note Updated!", "success")
    // const json = response.json();

    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title
    //     element.description = description;
    //     element.tag = tag
    //   }

    // }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
