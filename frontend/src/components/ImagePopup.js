export default function ImagePopup ({name, card, onClose}) {

    const isOpen = Object.keys(card).length;

    const close = () => {
        onClose();
    }
    const handleOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }

    return (
        <div className={`popup popup_${name} ${isOpen ? "popup_active" : ""}`} onClick={handleOverlayClose}>
            <div className="popup__container">
                <div className="gallery">
                    <img src={card.link} className="gallery__image" alt={card.name} />
                    <p className="gallery__title">{card.name}</p>
                </div>
                <button type="button" className="close-icon" onClick={close}></button> 
            </div>
        </div>
    )

}