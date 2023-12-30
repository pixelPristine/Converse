import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from 'universal-cookie'
const cookies =  new Cookies();

interface AuthProps {
  setIsAuth: any;
}

const Auth = ({setIsAuth}:AuthProps) => {
  
const SignInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result)
    cookies.set("auth-token", result.user.refreshToken)
    setIsAuth(true);
  } catch (err) {  
    console.error(err)
  }

}

  return (
    <div className="auth">
      <p>Sign in With Google To Continue</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
