import { auth, provider } from "../firebase-config";
import { User, UserCredential, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (arg0:boolean) => void;
  setIsGuest: (arg0:boolean) => void;
}


const Auth = ({ setIsAuth, setIsGuest }: AuthProps) => {
  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  
  const GuestNameRef: any = useRef(null)
  const TriggerGuestSignIn = () => {
    if (GuestNameRef.current.value != "") {
      cookies.set("Guest-Name", GuestNameRef.current.value)
      console.log(GuestNameRef.current.value)
      setIsGuest(true);
    }
  }

  return (
    <div className="auth">
      <p>Sign in With Google To Continue (Currently Unoperational)</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
      <p>
        Or <br />
        Sign in as a Guest
      </p>
      <input
        className="room input"
        type="text"
        placeholder="Enter guest name"
        autoFocus
        autoComplete="on"
        ref={GuestNameRef}
      />
      <button type="submit" onClick={TriggerGuestSignIn}>Enter as Guest</button>
    </div>
  );
};

export default Auth;