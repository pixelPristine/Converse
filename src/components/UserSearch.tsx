import { useRef } from "react";

interface UserSearchProps{
    setRoom: (arg:any) => void;
}

const UserSearch = ({setRoom }:UserSearchProps) => {

  const roomInputRef: any = useRef(null);



  return (
    <div className="search-thingy">
          <div className="room">
            <label className="room label">Enter Room Name:</label>
            <input className="room input" ref={roomInputRef} />
            <button
              type="submit"
              onClick={() => {
                setRoom(roomInputRef.current.value);
              }}
            >
              Enter Chat
            </button>
          </div>
        </div>
  )
}

export default UserSearch