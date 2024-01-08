import {  useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory

const Register = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("Heloooooooooo");
    try {
      const response = await axios.post('http://13.37.212.240:8081/auth/signup', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      console.log("user naaame : " + firstName);
      console.log("last naaame" +lastName);
      //console.log('JWT Token:', jwt);

      // Response handling
      const { jwt, message } = response.data;
      console.log('JWT Token:', jwt);

      // Stocker le jeton dans le localStorage
      localStorage.setItem('jwt', jwt);
      setServerMessage(message);
      console.log(localStorage.getItem('jwt'));

      // Reset form fields after successful signup
     // setfirstName('');
      //setlastName('');
      //setEmail('');
      //div> 
      navigate('/home');

    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error.message);
      setServerMessage('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
    }
  };

    return (
    <div>
    <div className="container" >
    <div className="row">
    <img src='./img/logo.png' alt='logo'></img>

            <h1>Sign up</h1>
            <p>{serverMessage}</p>

          <div className="row">
          <div className="col-sm-6">
          <form>
        <div className="form-group">
          <label></label>
          <input type="text"  className="form-control" id="firstName" placeholder="Enter firstName"
          
          value={firstName}
          onChange={(event) => {
            setfirstName(event.target.value);
          }}
          />

        </div>
        <div className="form-group">
          <label></label>
          <input type="text"  className="form-control" id="lastName" placeholder="Last name"
          
          value={lastName}
          onChange={(event) => {
            setlastName(event.target.value);
          }}
          />

        </div>

        <div className="form-group">
          <label></label>
          <input type="email"  className="form-control" id="email" placeholder="Email address"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
 
        </div>

        <div className="form-group">
            <label></label>
            <input type="password"  className="form-control" id="password" placeholder="Password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>

        <button type="button" className="btn btn-primary mt-4" onClick={handleSignup} >Signup</button>
      </form>
      </div> 
      </div>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-6">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
     </div>
    );
  }
  
  export default Register;