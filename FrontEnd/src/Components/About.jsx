import React, { useEffect,useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import "../style/about.css";
import { useNavigate } from "react-router-dom";

function About_user() {
  const [profile,setProfile]=useState({name:"",email:""})
  const navigate=useNavigate();
  useEffect(() => {
    if(!(localStorage.getItem('token'))){
      navigate("/login");
    }
    else{
      hadleDetails();
    }
  }, []);
  const hadleDetails= async ()=>{
    const response=await fetch("http://localhost:5000/api/auth/getuser",{
      method: "POST",
      headers: {
                                                               
        "auth-token": `${localStorage.getItem('token')}`,
      }
    });
    const json=await response.json();
    setProfile({name:json.name,email:json.email})

  }
  return (
    <>
      <div className="parent d-flex">
        <div className="child1">
          <img
            src="https://images.unsplash.com/photo-1693892256382-2556e798b17b?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="child2">
          <div>
            <h2>Name</h2>
            <h4>{profile.name}</h4>
          </div>
          <div>
            <h2>E-mail</h2>
            <h4>{profile.email}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default About_user;
