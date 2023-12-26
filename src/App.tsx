import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Chat from "./components/Chat";
import { useState } from "react";

let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

function App() {
  const handleSelectedItem = (item: number) => {
    console.log(item);
    setAlertShown(!AlertShown);
  };
  const [AlertShown, setAlertShown] = useState(true);

  return (
    <>
      {AlertShown && (
        <>
          <Alert>
            Hello <span>World</span>
          </Alert>
          <Chat />
        </>
      )}
      <Button
        items={items}
        length={items.length}
        onClickButton={handleSelectedItem}
      />
    </>
  );
}

export default App;

// <ListGroup
//   items={items}
//   heading="Cities"
//   onSelectItem={handleSelectedItem}
// />
