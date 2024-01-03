import { auth, provider, db } from "../firebase-config";
import { User, UserCredential, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useRef, useState, useEffect } from "react";
import "../styles/signup.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (arg0: boolean) => void;
  setIsGuest: (arg0: boolean) => void;
  oogabooga: () => void;
}

const Auth = ({ setIsAuth, setIsGuest, oogabooga }: AuthProps) => {
  const [newSignupName, setNewSignupName] = useState("");
  const [newSignupPass, setNewSignupPass] = useState("");
  const [newSignupConf, setNewSignupConf] = useState("");
  const [Failure, setFailure] = useState(false)
  const SignupRef = collection(db, "UserLogins");
  const [Signups, setSignups] = useState<any[]>([]);

  useEffect(() => {
    const queryMessages = query(SignupRef);
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let Info: any = [];
      console.log("New Message");
      snapshot.forEach((doc) => {
        Info.push({ ...doc.data(), id: doc.id });
      });

      setSignups(Info);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newSignupName == "" ||
      newSignupPass == "" ||
      newSignupConf == "" ||
      newSignupPass != newSignupConf
    ){
      setFailure(true);
      return;
    }

      await addDoc(SignupRef, {
        name: newSignupName,
        password: newSignupPass
      })

      cookies.set("User-Name", newSignupName);

      setNewSignupName("");
      setNewSignupPass("");
      setNewSignupConf("");
      setIsAuth(true);
  };

  const handleSignIn =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newSignupName == "" ||
      newSignupPass == "" )
      {
        setFailure(true);
        return;
      }

      for (let index = 0; index < Signups.length; index++) {
        if( Signups[index].name == newSignupName && Signups[index].password == newSignupPass)
        {
          cookies.set("User-Name", newSignupName);
          setIsAuth(true)
          return
        }
        
        setFailure(true);

      }
  }

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

  const GuestNameRef: any = useRef(null);
  const TriggerGuestSignIn = () => {
    if (GuestNameRef.current.value != "") {
      cookies.set("Guest-Name", GuestNameRef.current.value);
      console.log(GuestNameRef.current.value);
      setIsGuest(true);
    }
  };

  return (
    <div className="auth" onMouseOver={oogabooga}>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp} action="#">
            <h1>Create Account</h1>
            <input
              onChange={(e) => setNewSignupName(e.target.value)}
              value={newSignupName}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(e) => setNewSignupPass(e.target.value)}
              value={newSignupPass}
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(e) => setNewSignupConf(e.target.value)}
              value={newSignupConf}
              type="password"
              placeholder="Confirm Passwprd"
            />
            {Failure && <span className="error">Failure. Check fields again</span>}
            <button type="submit" id="upbtn">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn} action="#">
            <h1>Sign in</h1>
            <input onChange={(e) => setNewSignupName(e.target.value)}
              value={newSignupName} type="text" placeholder="Account Name" />
            <input onChange={(e) => setNewSignupPass(e.target.value)}
              value={newSignupPass} type="password" placeholder="Password" />
            {Failure && <span className="error">Failure. Check fields again</span>}
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <p>Sign in With Google To Continue (Currently Unoperational)</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
      <p>
        Or <br />
      </p>
      <form>
        <p>Sign in as a Guest</p>
        <input
          className="room input"
          type="text"
          placeholder="Enter guest name"
          autoFocus
          autoComplete="on"
          ref={GuestNameRef}
        />
        <button type="submit" onClick={TriggerGuestSignIn}>
          Enter as Guest
        </button>
      </form> */}
    </div>
  );
};

export default Auth;
