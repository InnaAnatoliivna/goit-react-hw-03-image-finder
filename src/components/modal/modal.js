import { createPortal } from "react-dom";

const Modal = ({ children, onBackdropClose }) => {
    const modalRoot = document.querySelector('#root-modal');

    return createPortal(
        <div
            id="modal-backdrop"
            className="Overlay"
            onClick={onBackdropClose}
        >
            <div
                id="modal-window"
                className="Modal"
            >
                {children}
            </div>
        </div>, modalRoot
    )
}

export default Modal;