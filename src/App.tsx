import "./styles/Chat.css";
import "./styles/Auth.css";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useState, useRef } from "react";
import Chat from "./components/Chat";
import Auth from "./components/Auth";
import UserSearch from "./components/UserSearch";
import Cookies from "universal-cookie";
const cookies = new Cookies();

let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

function App() {
  const [IsAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [IsGuest, setIsGuest] = useState(cookies.get("Guest-Name"));
  const [Room, setRoom] = useState("");

  const [chatKey, setChatKey] = useState(0); // Initialize with any value

  const SignUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("Guest-Name");
    setIsAuth(false);
    setIsGuest(false);
    setRoom("");
  };

  if (!IsAuth && !IsGuest) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} setIsGuest={setIsGuest} />
      </>
    );
  }

  return (
    <>
      <div className="App">
        <div className="sign-out room button">
          <button onClick={SignUserOut}>Sign Out</button>
        </div>
        
        <UserSearch setRoom={setRoom} />
          
          <Chat
            key={chatKey} // Use the key here
            room={Room}
            IsRoomGeneral={Room === "no_room"}
            guestName={cookies.get("Guest-Name")}
            LeaveRoom={() => {
              setRoom("");
            }}
          />

        {!Room && (
          <p>
            Functionality for separate chat rooms has been added <br />
            Use "general" as a central hub
          </p>
        )}
      </div>
    </>
  );
}

export default App;
