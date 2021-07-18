import React from "react";
import PropTypes from "prop-types";

const CharacterExtra = ({title, entity, showPopup, clickable}) => <div className={'character__extra'}>
  <div className={'character__extra-title'}>{title}</div>
  <div
    className={`character__extra-value${clickable && ' character__extra-value--clickable'}`}
    onClick={() => showPopup(entity, clickable)}
  >
    {entity && entity.name}
  </div>
</div>;

CharacterExtra.propTypes = {
  title: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  showPopup: PropTypes.func.isRequired,
  clickable: PropTypes.bool
};

CharacterExtra.defaultProps = {
  clickable: false,
};

export default CharacterExtra;