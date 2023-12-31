import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import "./styles/Chat.css";
import "./styles/Auth.css";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Chat from "./components/Chat";
import { useState, useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

function App() {
  const [IsAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [IsGuest, setIsGuest] = useState(cookies.get("Guest-Name"))
  const [GuestName, setGuestName] = useState(cookies.get("Guest-Name"))
  const [Room, setRoom] = useState("");

  const roomInputRef: any = useRef(null);

  const SignUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("Guest-Name")
    setIsAuth(false);
    setIsGuest(false)
    setGuestName("")
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
        {Room ? (
          <Chat
            room={Room}
            IsRoomGeneral={Room === "no_room"}
            guestName={cookies.get("Guest-Name")}
            LeaveRoom={() => {
              setRoom("");
            }}
          />
        ) : (
          <div>
            <form className="room">
              <label className="room label">Enter Room Name:</label>
              <input className="room input" ref={roomInputRef} />
              <button
                type="submit"
                onClick={() => setRoom(roomInputRef.current.value)}
              >
                Enter Chat
              </button>
            </form>
          </div>
        )}
            {!Room && <p>
              Functionality for separate chat rooms has been added <br />
              Use "general" as a central hub
            </p>}
      </div>
    </>
  );
}

export default App;

// <ListGroup
//   items={items}
//   heading="Cities"
//   onSelectItem={handleSelectedItem}
// />

// const handleSelectedItem = (item: number) => {
//   console.log(item);
//   setAlertShown(!AlertShown);
// };
// const [AlertShown, setAlertShown] = useState(true);
{
  /* {AlertShown && (
    <>
      <Alert>
        Hello <span>World</span>
      </Alert>
    </>
  )}
  <Button
    items={items}
    length={items.length}
    onClickButton={handleSelectedItem}
  /> */
}
