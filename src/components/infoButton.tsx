import { ReactEventHandler } from "react";
import "../pages/budget.css"

type buttonProp = {
  name?: string;
  className: string;
  handleClick?: ReactEventHandler;
  url?: string;
}

export const InfoButton = ({name, className, handleClick, url}: buttonProp) => {
  
  return (
    <button 
      onClick={handleClick}
      className={className}
      >
      {name}
      <img src={url} alt="" className="infoImage" />
    </button>
  )
}