import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { auth, db } from "../firebase-config";

const cookies = new Cookies();

interface ChatProps {
  room: string;
  IsRoomGeneral: boolean;
  LeaveRoom: () => void;
  guestName: string;
}

const Chat = ({ room, IsRoomGeneral, LeaveRoom, guestName }: ChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState<any[]>([]);

  const scrollToBottom = (id: string) => {
    const element = document.getElementById(id);
    if (element != null) {
      element.scrollTo(0, element.scrollHeight);
    }
  };

  useEffect(() => {
    const queryMessages = !IsRoomGeneral
      ? query(messagesRef, where("room", "==", room), orderBy("createdAt"))
      : query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      console.log("New Message");
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  },[room, IsRoomGeneral]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: guestName ? guestName : auth.currentUser?.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
        {/* <button onClick={LeaveRoom}>Leave Room</button> */}
      {room && (
        <div className="header">
              <img src="../images/no-user-photo.jpg" alt="something" />
            <span>{room.toUpperCase()}</span>
        </div>
      )}

      <div id="msg-window" className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container ${
              (cookies.get("Guest-Name") == message.user)
              || (auth.currentUser?.displayName == message.user)
                ? "message-container-sender"
                : ""
            }`}
          >
            <img className="user-img" key={"photo"} src="images/no-user-photo.jpg" alt="something" />
            <div
              className="message"
              
            >
              <span className="user">{message.user}</span>
              {message.text}
              {scrollToBottom("msg-window")}
            </div>
          </div>
        ))}
      </div>

      {room && (
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
      )}
      
    </div>
  );
};

export default Chat;
