import React from "react";
import PropTypes from "prop-types";

const NavButton = ({ handlePageChange, link, type }) =>
  <button className={'pagination__link'} onClick={() => handlePageChange(link)}>
    {(type === 'prev' && 'Previous') || 'Next'}
  </button>;


const Pagination = ({ prev, next, fetch }) => {
  return (
    <div className={'pagination'}>
      {prev && <NavButton handlePageChange={fetch} link={prev} type={'prev'}/>}

      {next && <NavButton handlePageChange={fetch} link={next}/>}
    </div>
  );
}

Pagination.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
  fetch: PropTypes.func.isRequired
}

export default Pagination;