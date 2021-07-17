import React from "react";
import PropTypes from "prop-types";
import {defaultCharacterApiUrl} from "../helpers/constants";

const NavButton = ({ handlePageChange, link, type }) =>
  <button className={'pagination__link'} onClick={() => handlePageChange(link)}>
    {(type === 'prev' && 'Previous') || 'Next'}
  </button>;


const Pagination = ({ prev, next, fetch, setActivePage, page }) => {
  const handlePageChange = (link, newPage = null) => {
    fetch(link);

    if (newPage) {
      setActivePage(newPage);
    }
  }

  return (
    <div className={'pagination'}>
      <NavButton handlePageChange={handlePageChange} link={prev} type={'prev'}/>
      {page && <input
        type={'text'}
        className={'pagination__input'}
        value={page}
        onChange={e => handlePageChange(`${defaultCharacterApiUrl}?page=${e.target.value}`)}
      />}
      <NavButton handlePageChange={handlePageChange} link={next}/>
    </div>
  );
}

Pagination.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
  fetch: PropTypes.func.isRequired,
  page: PropTypes.number,
  setActivePage: PropTypes.func,
}

export default Pagination;