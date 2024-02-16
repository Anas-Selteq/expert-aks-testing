import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({
  searchTerm,
  handleInputChange,
  searchResults,
  handleResultClick,
}: {
  searchTerm: any;
  handleInputChange: any;
  searchResults: any;
  handleResultClick: any;
}) => {
  console.log("searchTerm",searchTerm.length)
  return (
    <>
    <div
      className=" search_map"
    >
      <div
        className={`d-flex align-items-center rounded ${searchTerm.length === 0 ? "unactive_input" : "active_input"}`}>
        <input
          type="text"
          className="border border-0 search_bar_placeholder"
          style={{
            marginLeft: "0.5rem",
            outline: "none",
            width: "100%",

          }}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type your address"
        />
        <BiSearch />
      </div>
      {searchTerm.length != 0 ? (
        <ul
          className="dropdown_search_text ps-0 borderline"
        >
          {searchResults.map((result: any, index: number) => (
            <>
              <li key={index} className="pt-1 px-2 py-2 background_of_adress" onClick={() => handleResultClick(result)}>
                {result.formatted}
              </li>
            </>
          ))}
        </ul>
      ): null}
    </div>
    
    </>
  );
};

export default SearchBar;
