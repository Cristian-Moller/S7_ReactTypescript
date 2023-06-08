import { ReactEventHandler, useState } from "react"
import { InfoButton } from "./infoButton"
import infoImage from "../assets/info-icon.png"
import "../pages/budget.css"
import ReactDOM from "react-dom"

type popupProp = {
  name?: string;
  text: string;
  handleClick?: ReactEventHandler;
}

export function Popup({name, text, handleClick}: popupProp) {
  const [popupLanguage, setPopupLanguage] = useState(false)
  const [popupPage, setPopupPage] = useState(false)
  const handlePopupContainer = (e: { stopPropagation: () => unknown }) => e.stopPropagation()

  function infoPopUp(event: { name: string | undefined}): void {
    if(event.name  == 'language'){
      setPopupLanguage(!popupLanguage)
    } else if(event.name  == 'page'){
      setPopupPage(!popupPage)
    }
  }
  
  return (
    <div className={name} onClick={handleClick}>
    {(popupLanguage || popupPage) && ReactDOM.createPortal(
        <div className="popup isOpen" onClick={() => infoPopUp({name})}>
          <div className="popup-container" onClick={handlePopupContainer}>{text}</div>
        </div>,
        document.getElementById('portal') as HTMLElement
      )}
      <InfoButton handleClick={() => infoPopUp({name})} className='infoButton' url={infoImage} />
    </div>
  )
}