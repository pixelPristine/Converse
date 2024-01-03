import "./styles/Chat.css";
import "./styles/Auth.css";
import "./styles/Sidebar.css";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Auth from "./components/Auth";
import UserSearch from "./components/UserSearch";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [IsAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [IsGuest, setIsGuest] = useState(cookies.get("User-Name"));
  const [Room, setRoom] = useState("");

  const SignUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("User-Name");
    setIsAuth(false);
    setIsGuest(false);
    setRoom("");
  };

  const handleLoginAnimation = async () => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    signUpButton?.addEventListener("click", () => {
      container?.classList.add("right-panel-active");
    });
    signInButton?.addEventListener("click", () => {
      container?.classList.remove("right-panel-active");
    });
  };

  if (!IsAuth && !IsGuest) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} setIsGuest={setIsGuest} oogabooga={handleLoginAnimation} />
      </>
    );
  }

  return (
    <>
      <div className="App">
        <Sidebar SignUserOut={SignUserOut} />

        <UserSearch setRoom={setRoom} user={cookies.get("User-Name")} />

        <Chat
          room={Room}
          IsRoomGeneral={Room === "no_room"}
          guestName={cookies.get("User-Name")}
          LeaveRoom={() => {
            setRoom("");
          }}
        />
      </div>
    </>
  );
}

export default App;
