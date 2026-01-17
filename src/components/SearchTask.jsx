import React from "react";

const SearchTask = ({ search, setSearch }) => {
  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      type="search"
      placeholder="Buscar por título..."
    />
  );
};

export default SearchTask;
