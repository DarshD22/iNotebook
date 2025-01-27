import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

function Alert() {
  const {alert}=useContext(noteContext);
  return (
    <>
    <div className="d-flex align-item-center" style={{"height":"70px"}}>
      {!(alert==null) && <div className="alert alert-primary flex-grow-1" role="alert">
          {alert.type} and {alert.message}
      </div>}
    </div>
    </>
  );
}

export default Alert;
