import { ReactEventHandler } from "react";

type buttonProp = {
  text?: string;
  className: string;
  handleClick?: ReactEventHandler;
}

export const Button = ({text, className, handleClick}: buttonProp) => {
  
  return (
    <button 
      onClick={handleClick}
      className={className}
      >
      {text}
    </button>
  )
}