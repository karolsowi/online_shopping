const GoBackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button type="button" className="btn btn-light btn-small" onClick={goBack}>
      Wróć
    </button>
  );
};

export default GoBackButton;