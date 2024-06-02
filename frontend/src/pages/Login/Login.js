import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "../../Images/talentlogo.png";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import styles from "../Login/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass) 
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.logo}>
          <img src={logo} alt="Talent Logo" />
          <h6><b>Welcome to Talent Corner - India’s Biggest Placement Consultancy</b></h6>
        </div>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <div style={{ position: "relative" }}>
          <InputControl
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
        </div>
        <div style={{position:"relative"}}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleTogglePassword}
            id="showPassword"
            style={{  right: "10px", top: "50%", }}
          />
          <label htmlFor="showPassword" style={{ marginLeft: "5px", color: "#675080"}}>Show Password</label>
        </div>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
