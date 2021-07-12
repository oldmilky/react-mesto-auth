function PopupWithForm({name, title, children, isOpen, onClose, handleSubmit, submitButtonValue}) {

  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h4 className="popup__title">{title}</h4>
          <form className="popup__form" name={name} onSubmit={handleSubmit}>
            {children}
            <button type="submit" className="popup__button-save" value={submitButtonValue} name="submit">{submitButtonValue}</button>
          </form>
          <button type="button" className="popup__button-close" onClick={onClose} />
        </div>
      </div>
  );
}

export default PopupWithForm;