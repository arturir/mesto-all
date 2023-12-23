export default function InfoTooltip ({type, title, isOpen, onClose}) { 

    const close = () => {
        onClose();
    }
    const handleOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }

    return (
        <div className={`popup popup_info-tooltip  ${isOpen ? "popup_active" : ""}`} onMouseDown={handleOverlayClose}>
            <div className="popup__container popup__container_form ">
                {type==="error" && 
                <div className="popup__wrapper">
                    <div className="popup__image popup__image_type_error"></div>
                    <h2 className="popup__title">{title}</h2>
                </div>}
                {type==="ok" && 
                <div className="popup__wrapper">
                    <div className="popup__image popup__image_type_ok"></div>
                    <h2 className="popup__title">{title}</h2>
                </div>}
                <button type="button" className="close-icon" onClick={close}></button> 
            </div>
        </div>
    )
}