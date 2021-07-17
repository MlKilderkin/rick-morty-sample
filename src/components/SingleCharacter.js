import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Context} from "../helpers/Context";

const CharacterExtra = ({title, value}) => <div className={'character__extra'}>
  <div className={'character__extra-title'}>{title}</div>
  <div className={'character__extra-value'}>{value}</div>
</div>

const SingleCharacter = ({info}) => {
  const [episodes] = useContext(Context);
  const [characterEpisodes, setCharacterEpisodes] = useState([]);

  const {
    name,
    image,
    status,
    species,
    gender,
    episode,
    origin,
    location,
  } = info;

  useEffect(() => {
    if (!episodes) {
      return;
    }

    const filteredItems = episodes.filter(({url}) => episode.indexOf(url) >= 0);
    setCharacterEpisodes(filteredItems);
  }, [episodes, episode])

  return (
    <div className={'character'}>
      <div className={'character__image'}>
        <img src={image} alt={name} />
      </div>
      <div className={'character__info'}>
        <h2 className={'character__name'}>
          {name}
        </h2>
        <div className={'character__meta'}>
          <p>{status} - {species}</p>
          <p>{gender}</p>
        </div>
        <CharacterExtra value={location.name} title={'Location:'} />
        <CharacterExtra value={origin.name} title={'Origin:'} />
        {characterEpisodes && <>
          <div className={'character__episodes-title'}>Episodes:</div>
          <div className={'character__episodes'}>
            {characterEpisodes.map((item, index) => (
              <span key={index} className={'character__episode'}>{item.name}</span>
            ))}
          </div>
        </>}

      </div>
    </div>
  )
};

SingleCharacter.propTypes = {
  info: PropTypes.object.isRequired
}

export default SingleCharacter;