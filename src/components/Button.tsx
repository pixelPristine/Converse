import React, { useState } from "react";

let colors = ['primary', 'secondary']

interface ButtonProps {
  items: string[];
  length: number;
  onClickButton: (item: number) => void;
}

const Button = ({ items, length, onClickButton }: ButtonProps) => {
  const [ButtonContent, setButtonContent] = useState(0);
  const [ColorIndex, setColorIndex] = useState(false)

  return (
    <button
      className={(ColorIndex)?'btn btn-primary':'btn btn-secondary'}
      onClick={() => {

          setButtonContent((ButtonContent + 1) % length);
        
          setColorIndex(!ColorIndex)
          
        onClickButton(ButtonContent);
      }}
    >
      {items[ButtonContent]}
    </button>
  );
};

export default Button;
