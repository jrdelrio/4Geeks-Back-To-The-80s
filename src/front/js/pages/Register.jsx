import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import { Footer } from "../component/footer";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmePassword] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleConfirmedPassword = (ev) => {
    setConfirmePassword(ev.target.value);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handleDescription = (ev) => {
    setDescription(ev.target.value);
  };

  const sendRegisterInformation = (ev) => {
    ev.preventDefault();

    if (password === confirmedPassword) {
      fetch(process.env.BACKEND_URL + "/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          description: description,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.table({
      username: username,
      email: email,
      password: password,
      description: description,
    });
  }, [username, email, password, description]);

  return (
    <div className="container-register">
      <form
        className="container-form needs-validation"
        onSubmit={sendRegisterInformation}
      >
        <div className="mb-3">
          <label htmlFor="UsernameInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="UsernameInput"
            aria-describedby="emailHelp"
            onChange={handleUsername}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="EmailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="EmailInput"
            onChange={handleEmail}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PasswordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="PasswordInput"
            aria-describedby="emailHelp"
            onChange={handlePassword}
            maxLength={72}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PasswordConfirmInput" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="PasswordConfirmInput"
            onChange={handleConfirmedPassword}
            maxLength={72}
            required
          />
          {password !== confirmedPassword ? (
            <div className="invalid-feedback d-block">
              Passwords do not match
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="DescriptionInput">Descriptions</label>
          <textarea
            className="form-control"
            id="DescriptionInput"
            rows="3"
            placeholder="Cuéntanos tu tipo de música favorita de los 80's, artistas, álbums ..."
            onChange={handleDescription}
            maxLength={2048}
          ></textarea>
        </div>
        <button type="submit" className="btn-create">
          Create Account
        </button>
      </form>
      <div className="register-footer">
              <Footer></Footer>
              </div> 
    </div>
  );
};
