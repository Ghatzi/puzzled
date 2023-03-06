const Input = ({
  labelText,
  inputType,
  inputId,
  inputPlaceholder,
  inputRole,
  inputValue,
  handleChange,
  inputKeyPress,
  inputChecked,
  inputRef
}) => {
  const setStyle =
    inputType === 'text' || inputType === 'number' || inputType === 'password'
      ? 'placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
      : inputType === 'checkbox'
      ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-2'
      : '';

  return (
    <>
      <label htmlFor={inputId}>{labelText}</label>
      <input
        type={inputType}
        className={setStyle}
        id={inputId}
        placeholder={inputPlaceholder}
        role={inputRole}
        value={inputValue}
        onChange={handleChange}
        onKeyUp={inputKeyPress}
        checked={inputChecked}
        ref={inputRef}
      />
    </>
  );
};

export default Input;
