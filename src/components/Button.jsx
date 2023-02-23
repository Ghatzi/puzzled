const Button = ({ buttonIcon, buttonText, handleClick, buttonStyle }) => (
  <button
    className={`flex items-center py-2 px-4 text-white font-semibold rounded-lg shadow-mdfocus:outline-none focus:ring-2 focus:ring-opacity-75 ${buttonStyle}`}
    onClick={handleClick}
  >
    {buttonIcon} {buttonText}
  </button>
);

export default Button;
