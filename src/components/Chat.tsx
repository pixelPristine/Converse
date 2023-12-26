import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

type MessageType = {
  id: string;
  // include other properties of a message here, for example:
  text: string;
  createdAt: any; // use a more specific type if available
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const queryMessages = query(messagesRef);
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
    });

    setNewMessage("");
  };

  return (
    <div>
      <div className="">
        {messages.map((message) => (
          <h1> {message.text}</h1>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
