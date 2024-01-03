interface SidebarProps {
  SignUserOut: () => void;
}

const Sidebar = ({ SignUserOut }: SidebarProps) => {
  return (
    <div className="sidebar">
      <img className="circular" src="images/no-user-photo.jpg" alt="" />

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
