import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Context} from "../helpers/Context";
import CharacterExtra from "./CharacterExtra";
import Popup from "./Popup";

const SingleCharacter = ({info}) => {
  const [episodes, fetchLocation] = useContext(Context);
  const [characterEpisodes, setCharacterEpisodes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);

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
  }, [episodes, episode]);

  const handleLocationPopup = async (entity, clickable) => {
    if (!clickable) {
      return;
    }

    const result = await fetchLocation(entity);

    if (!result) {
      return;
    }

    setShowPopup(true);
    setLocationInfo(result);
  };

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
        <CharacterExtra entity={location} title={'Location:'} showPopup={handleLocationPopup} clickable={true} />
        <CharacterExtra entity={origin} title={'Origin:'} showPopup={handleLocationPopup} />
        {characterEpisodes && <>
          <div className={'character__episodes-title'}>Episodes:</div>
          <div className={'character__episodes'}>
            {characterEpisodes.map((item, index) => (
              <span key={index} className={'character__episode'}>{item.name}</span>
            ))}
          </div>
        </>}
      </div>
      {showPopup && locationInfo && <Popup entity={locationInfo} title={'Location info'} handlePopup={setShowPopup} />}
    </div>
  )
};

SingleCharacter.propTypes = {
  info: PropTypes.object.isRequired
}

export default SingleCharacter;