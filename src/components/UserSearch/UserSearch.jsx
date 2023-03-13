import React, { useEffect, useState } from "react";
import Recepies from "../Recepes/Recepies";
const UserSearch = () => {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;

  const [recipes, setRecepies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("paneer");

  useEffect(() => {
    getRecepies();
  }, [query]);

  const getRecepies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();

    setRecepies(data.hits);
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  console.log(query);

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={handleSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {recipes?.map((recipe, index) => {
        return (
          <Recepies
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
          />
        );
      })}
    </div>
  );
};

export default UserSearch;
