import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.components";
import "./authentication.stles.jsx";
import { AuthenticationContainer } from "./authentication.stles.jsx";

const SignIn = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default SignIn;
