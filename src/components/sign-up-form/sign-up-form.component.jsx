import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.jsx";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles.jsx";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action.js";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  configmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, configmPassword } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, configmPassword } = formFields;
    if (password !== configmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));

      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation encountered an error", error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={handleChange}
          name="configmPassword"
          value={configmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
