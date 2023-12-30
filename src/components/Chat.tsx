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
import { auth, db } from "../firebase-config";

interface ChatProps {
  room: string;
  IsRoomGeneral: boolean;
  LeaveRoom: () => void;
}

const Chat = ({ room, IsRoomGeneral, LeaveRoom}: ChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState<any[]>([]);

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
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
      <button onClick={LeaveRoom}>Leave Room</button>
        <h1>Welcome to : {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default Chat;
