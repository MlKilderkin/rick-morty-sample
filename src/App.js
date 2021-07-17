import React, {useState, useEffect} from 'react';
import {handleRequest} from "./helpers/fetch";
import Pagination from "./components/Pagination";
import {defaultCharacterApiUrl} from "./helpers/constants";
import Characters from "./components/Characters";


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (characters.length > 0) {
      return;
    }
    fetchCharacters(defaultCharacterApiUrl);
  }, [characters]);

  const fetchCharacters = (url) => {
    handleRequest(url).then(({info, results}) => {
      const {
        prev,
        next,
      } = info;

      setPrevPage(prev);
      setNextPage(next);
      setCharacters(results);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div className={'assignment'}>
      <Characters list={characters} />
      <Pagination
        prev={prevPage}
        next={nextPage}
        fetch={fetchCharacters}
      />
    </div>
  )
};

export default App;