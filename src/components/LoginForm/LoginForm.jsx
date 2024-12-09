import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Button from "@mui/material/Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const nav = useSelector((store) => store.pending);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // When a user logs in, nav is set to '/pending' if the user isn't approved
  // The user is logged out, then pushed to the Pending Approval page
  useEffect(() => {
    if (nav === "/pending") {
      history.push(nav);
      dispatch({ type: "CLEAR_NAV" });
    }
  }, [nav]);

  const magicUser = () => {
    setEmail("alexis.sibley222@gmail.com");
    setPassword("password");
  };
  const magicUserJoe = () => {
    setEmail("joe.peterson5323@gmail.com");
    setPassword("password");
  };

  const magicAdmin = () => {
    setEmail("primedisabilitysupp@gmail.com");
    setPassword("password");
  };

  return (
    <form className="formPanel" onSubmit={login}>
      <h2 onClick={magicUserJoe}>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="email" onClick={magicUser}>
          Email:
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password" onClick={magicAdmin}>
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button type="submit" name="submit" value="Log In" variant="contained">
          Login
        </Button>
        {/* <input className="btn" type="submit" name="submit" value="Log In" /> */}
      </div>
    </form>
  );
}

export default LoginForm;
