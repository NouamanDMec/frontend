import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

const  Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setJwtToken(storedToken);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://13.37.212.240:8081/auth/signin",
        {
          email: email,
          password: password,
        }
      );

      const { jwt, message } = response.data;

      localStorage.setItem("jwt", jwt);
      setServerMessage(message);

      //setEmail("");
      //setPassword("");

      // Redirect to "/home" upon successful login
      navigate('/home');
    } catch (error) {
      console.error(
        "Erreur lors de la connexion :",
        error.response ? error.response.data : error.message
      );
      setServerMessage(
        "Erreur lors de la connexion. Veuillez vérifier vos informations."
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
        <img src='./img/logo.png' alt='logo'></img>
          <h1>Log in</h1>
          <p>{serverMessage}</p>
          
        </div>

        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="form-group">
                {/*<label className="email_label">Email</label>*/}
                <input
                 type="email"
                 className="form-control"
                 id="email"
                 placeholder="Enter Email"

                 value={email}
                 onChange={(event) => {
                    setEmail(event.target.value);
                 }}
                />
              </div>

              <div className="form-group">
               {/* < label  className="password_label">Password</label>*/}
                <input
                 type="password"
                 className="form-control"
                 id="password"
                 placeholder="Enter Password"
                 value={password}
                 onChange={(event) => {
                    setPassword(event.target.value);
                 }}
                />
              </div>
              <button type="button" className="btn btn-primary"  onClick={handleLogin} >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <p>Don't have an account? <Link to="/register">Sign up</Link>.</p>
        </div>
      </div>
    </div>
 );
}

export default Login;
