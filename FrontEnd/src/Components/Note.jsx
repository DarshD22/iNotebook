import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

function Note(props) {

  const {deleteNote}=useContext(noteContext);

  const deletion=()=>{
    deleteNote(props.note._id);
  }

  const edit=()=>{
    props.modal(props.note._id, props.note.title,props.note.tag,props.note.description);
  }



  const dateString = props.note.date;
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return (
    <>
      <div className="card flex-shrink-0 w-40 flex-grow-0" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
          <p className="card-text">{props.note.description}</p>
        </div>
        <div className="card-footer">
          <small className="text-body-secondary">{`Note added on ${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`}</small>
        </div>
        <div className="d-flex justify-content-start p-4 gap-3">
          <i className="fa-solid fa-trash fa-xl" onClick={deletion}></i>
          <i className="fa-solid fa-file-pen fa-xl" onClick={edit} ></i>
        </div>
      </div>
    </>
  );
}

export default Note;
