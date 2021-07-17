import React from "react";
import PropTypes from "prop-types";
import SingleCharacter from "./SingleCharacter";

const Characters = ({list}) => {
  if (!list) {
    return false;
  }

  return (
    <div className={'characters'}>
      {list.map((character, index) => <SingleCharacter key={index} info={character} />)}
    </div>
  );
}

Characters.propTypes = {
  list: PropTypes.array
}

export default Characters;