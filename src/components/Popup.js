import React from "react";
import PropTypes from "prop-types";

const Popup = ({entity, title, handlePopup}) => {
  const {
    id,
    name,
    type,
    dimension,
    residents
  } = entity;

  const amountOfResidents = (residents && residents.length) || 0;

  return (
    <div className={'popup'}>
      <div className={'popup__wrap'}>
        <div className={'popup__header'}>
          {title}
        </div>
        <div className={'popup__body'}>
          <p>ID: <strong>{id || 'N/A'}</strong></p>
          <p>Name: <strong>{name || 'unknown'}</strong></p>
          <p>Type: <strong>{type || 'unknown'}</strong></p>
          <p>Dimension: <strong>{dimension || 'unknown'}</strong></p>
          <p>Amount of the residents: <strong>{amountOfResidents}</strong></p>
        </div>

        <div className={'popup__footer'}>
          <button className={'popup__button'} onClick={() => handlePopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  entity: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handlePopup: PropTypes.func.isRequired
};

export default Popup;