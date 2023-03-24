import axios from "axios";
import { useState } from "react";
import "./resetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);


  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findOutUser`,
        {
          email,
        }
      );

      setFoundUser(data[0])
      
    } catch (error) {
        console.log(error.message);
    }
  };
  const sendCode = async () => {
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,{email:foundUser.email});
      
    } catch (error) {
        console.log(error.message);
    }
  };



  return (
    <div className="user-search">
      {" "}
      {/* Add the "user-search" class to the container */}
      <label htmlFor="email-input">Email address:</label>
      <input
        type="text"
        id="email-input"
        value={email}
        onChange={handleInputChange}
        className="user-search-input"
      />
      <button onClick={handleSearchClick} className="user-search-button">
        Search
      </button>
      {foundUser ? (
        <div className="user-search-results">
          <p>Name: {foundUser.name}</p>
          <p>Email: {foundUser.email}</p>
          <p>picture: <img src={foundUser.picture} alt="" /></p>
          <button onClick={sendCode} >send code</button>
        </div>
      ) : (
        <p className="user-search-no-results">
          No user found with that email address.
        </p>
      )}
    </div>
  );
}

export default ResetPassword;
