import React, { useContext, useState } from 'react'
import noteContext from "../Context/Notes/noteContext";



function Addnote() {
    const {addNote}=useContext(noteContext);
    const [state,setState]=useState({title:"",description:"",tag:""});

    const stateChange=(event)=>{
        setState({...state,[event.target.name]: event.target.value})
    }

    const clear=()=>{
        setState({title:"",description:"",tag:""})
    }

    const handleNote= async (e)=>{
        await addNote(state);
        clear();
    }
  return (
    <>
      <div className="container my-4">
        <h2>Add a new Note Here</h2>
        <form action="">
          <div className="mb-3">
            <label htmlFor="noteTitleName" className="form-label">
              Note Title
            </label>
            <input
            value={state.title}
            onChange={stateChange}
              className="form-control"
              id="noteTitleName"
              placeholder="Office Meeting"
              name="title"
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="noteTag" className="form-label">
              Note Tag
            </label>
            <input
            onChange={stateChange}
            value={state.tag}
              className="form-control"
              id="noteTag"
              placeholder="Office Home ...."
              name="tag"
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="noteDescription" className="form-label">
              Note Description
            </label>
            <textarea
            value={state.description}
              className="form-control"
              id="noteDescription"
              rows="3"
              onChange={stateChange}
              name="description"
              minLength={5}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary mx-4" onClick={handleNote}>
              Submit Note
            </button>
            <button type="button" className="btn btn-primary mx-4" onClick={clear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Addnote
