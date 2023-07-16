import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
class Modal extends Component {
    modalRoot = document.querySelector('#root-modal');
    // { children, onBackdropClose, onKeydownClose } -->>>>props
    componentDidMount() {
        window.addEventListener('keydown', this.props.onKeydownClose);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.onKeydownClose);
    }
    render() {
        return createPortal(
            <div id="modal-backdrop" className="Overlay" onClick={this.props.onBackdropClose}>
                <div id="modal-window" className="Modal">
                    {this.props.children}
                </div>
            </div>, this.modalRoot
        )
    }
}
export default Modal;

Modal.propTypes = {
    onSubmit: PropTypes.func,
}