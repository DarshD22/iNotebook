import React, { useState ,useContext} from "react";
import noteContext from "../Context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const {setAlert}=useContext(noteContext)
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history=useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {

      localStorage.setItem("token", json.authToken);
      handleAlert({type:"okay",message:"signin successgully "})
      history("/");
    } else {
      handleAlert({type:"error",message:"unsuccessfull"})
    }
  };

  const handleAlert=({type,message})=>{
    setAlert({type,message});
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
