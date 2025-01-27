import React, { useContext, useEffect, useRef, useState } from "react";
import Note from "./Note";
import noteContext from "../Context/Notes/noteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const { notes, getAllNotes, updateNote } = useContext(noteContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAllNotes();
    } else {
      navigate("/Login");
    }
  }, [notes]);

  const updateModalDetails = (id, newTitle, newTag, newDescription) => {
    setModalDetails({
      id: id,
      etitle: newTitle,
      etag: newTag,
      edescription: newDescription,
    });
  };

  const newstateChange = (event) => {
    setModalDetails({
      ...newDetails,
      [event.target.name]: event.target.value,
    });
  };

  const ref = useRef(null);
  const ref2 = useRef(null);

  const [newDetails, setModalDetails] = useState({
    id: "",
    etitle: "",
    etag: "",
    edescription: "",
  });

  const modal = (id, newTitle, newTag, newDescription) => {
    updateModalDetails(id, newTitle, newTag, newDescription);
    ref.current.click();
  };

  const updation = () => {
    updateNote(
      newDetails.id,
      newDetails.etitle,
      newDetails.etag,
      newDetails.edescription
    );
    ref2.current.click();
  };

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="enoteTitleName" className="form-label">
                    Note Title
                  </label>
                  <input
                    value={newDetails.etitle}
                    onChange={newstateChange}
                    className="form-control"
                    id="enoteTitleName"
                    name="etitle"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enoteTag" className="form-label">
                    Note Tag
                  </label>
                  <input
                    value={newDetails.etag}
                    onChange={newstateChange}
                    minLength={3}
                    required
                    className="form-control"
                    id="enoteTag"
                    name="etag"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enoteDescription" className="form-label">
                    Note Description
                  </label>
                  <textarea
                    value={newDetails.edescription}
                    onChange={newstateChange}
                    className="form-control"
                    id="enoteDescription"
                    rows="3"
                    name="edescription"
                    minLength={5}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={ref2}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updation}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-6 d-flex justify-content-evenly p-5 flex-wrap gap-5">
        {notes.map((note, index) => (
          <Note key={index} note={note} modal={modal} />
        ))}
      </div>
    </>
  );
}

export default Home;
