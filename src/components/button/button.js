import PropTypes from 'prop-types';

const Button = ({ children, handleClick }) => {

    return (
        <div className="btn-wrapper">
            <button
                type="button"
                className="Button"
                onClick={handleClick}
            >{children}</button>
        </div>
    )
}

export default Button;

Button.propTypes = {
    handleClick: PropTypes.func,
}