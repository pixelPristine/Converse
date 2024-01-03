import user_image from '/images/no-user-photo.jpg'
import chat_icon from '/images/chat.png'



interface SidebarProps {
  SignUserOut: () => void;
}

const Sidebar = ({ SignUserOut }: SidebarProps) => {
  return (
    <div className="sidebar">
      <img className="circular" src={user_image} alt="" />

      <div className="panels">
        <img className="chats-panel" src="images/chat.png" alt="chats" />
        <img className="contacts-panel" src="images/contacts.png" alt="contacts" />
      </div>

      <div className="sign-out">
        <button onClick={SignUserOut}>
          <img src="images/signoutbtn.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;