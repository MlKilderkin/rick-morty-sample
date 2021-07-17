import React, {useState, useEffect} from 'react';
import {handleRequest} from "./helpers/fetch";
import Pagination from "./components/Pagination";
import {defaultCharacterApiUrl} from "./helpers/constants";


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchCharacters(defaultCharacterApiUrl);
  });

  const fetchCharacters = async (url) => {
    const {info, results} = await handleRequest(url);

    setPrevPage(info.prev);
    setNextPage(info.next);
    setCharacters(results);
  }

  return (
    <div className={'assignment'}>
      <Pagination
        prev={prevPage}
        next={nextPage}
        page={page}
        setActivePage={setPage}
        fetch={fetchCharacters}
      />
    </div>
  )
};

export default App;