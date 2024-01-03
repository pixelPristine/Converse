import user_icon from '/images/no-user-photo.jpg'
import chat_icon from '/images/chat.png'
import contacts_icon from '/images/contacts.png'
import signout_icon from '/images/signoutbtn.png'



interface SidebarProps {
  SignUserOut: () => void;
}

const Sidebar = ({ SignUserOut }: SidebarProps) => {
  return (
    <div className="sidebar">
      <img className="circular" src={user_icon} alt="" />

      <div className="panels">
        <img className="chats-panel" src={chat_icon} alt="chats" />
        <img className="contacts-panel" src={contacts_icon} alt="contacts" />
      </div>

      <div className="sign-out">
        <button onClick={SignUserOut}>
          <img src={signout_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;