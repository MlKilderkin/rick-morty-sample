import React, {useState, useEffect} from "react";
import {handleRequest} from "./helpers/fetch";
import Pagination from "./components/Pagination";
import {allCharacterApiUrl, allEpisodesApiUrl} from "./helpers/constants";
import Characters from "./components/Characters";
import {Context} from "./helpers/Context";
import Loader from "./components/Loader";
import "./scss/main.scss";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const fetchCharacters = (url) => {
    setIsLoading(true);
    handleRequest(url).then(({info, results}) => {
      const {
        prev,
        next,
      } = info;

      setPrevPage(prev);
      setNextPage(next);
      setCharacters(results);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  };

  const fetchEpisodes = async (page = 1) => {
    const {info, results} = await handleRequest(`${allEpisodesApiUrl}?page=${page}`);

    const data = results;

    if (info.pages > page) {
      return data.concat(await fetchEpisodes(page + 1));
    }

    return data;
  };

  const fetchLocation = async (entity) => {
    if (!entity) {
      return;
    }

    const existedLocation = locations.find(item => item.url === entity.url);

    if (existedLocation) {
      return existedLocation;
    }

    const location = await handleRequest(entity.url);

    setLocations([...locations, ...[location]]);
    return location;
  };

  useEffect(() => {
    if (characters.length > 0) {
      return;
    }
    // Async effects could cause memory leaks so it is important to perform cleanup on component unmount.
    const abortController = new AbortController();

    void async function fetchEpisodesData() {
      const result = await fetchEpisodes();
      setEpisodes(result);
    }();

    fetchCharacters(allCharacterApiUrl);

    return () => {
      abortController.abort();
    };
  }, [characters]);

  return (
    <Context.Provider value={[episodes, fetchLocation]}>
      <div className={'assignment'}>
        {isLoading && <Loader />}
        {!isLoading && <>
          <Pagination
            prev={prevPage}
            next={nextPage}
            fetch={fetchCharacters}
          />
          <Characters list={characters} />
          <Pagination
            prev={prevPage}
            next={nextPage}
            fetch={fetchCharacters}
          />
        </>}
      </div>
    </Context.Provider>
  )
};

export default App;