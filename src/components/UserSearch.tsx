import { useEffect, useState, useRef } from "react";
import user_icon from '/images/no-user-photo.jpg'
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

interface UserSearchProps {
  setRoom: (arg: any) => void;
  user: string;
}

const UserSearch = ({ setRoom, user }: UserSearchProps) => {
  //   const roomInputRef: any = useRef(null);
  const chatRef = collection(db, "messages");
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const queryChats = query(
      chatRef,
      where("user", "==", user),
      orderBy("room")
    );
    const unsubscribe = onSnapshot(queryChats, (snapshot) => {
      let chats: any = [];
      console.log("New Chat");
      snapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });

      let unique:any = [];

      for (let index = 0; index < chats.length; index++) {
          if(chats[index].room != unique[unique.length-1]?.room){
                unique.push(chats[index])
            }
      }
      setChats(unique);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="search-container">
        <input
          placeholder="Search"
          className=""
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

      <div className="search-results">
        {chats.map((chat) => (
          <div 
            className="search-result-entry"
            key={chat.id}
            onClick={() => {
              setRoom(chat.room);
            }}
          >
            <img src={user_icon} alt="" />
            <span>
                {chat.room}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
