import { useEffect, useState } from "react";
// import { getFavourites } from "../db/db_apis";
import ReactGA from "react-ga4";

const Favourites = () => {
  //   const { favourites, loading, error } = getFavourites();

  const [searchText, setSearchText] = useState<string>("");
  const [filteredFaves, setFilteredFaves] = useState(favourites);
  console.log(searchText);
  const onSearchChange = (search: string) => {
    setSearchText(search);
  };
  useEffect(() => {
    const newfilteredFavourites = filteredFaves.filter((faveFilter) => {
      return faveFilter.title.toLowerCase().includes(searchText);
    });

    setFilteredFaves(newfilteredFavourites);
  }, [searchText]);

  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, []);

  return (
    <div>
      <input
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
      ></input>
      <div>
        {filteredFaves.map((fave: {}, key: number) => (
          <div key={key}>
            <p>Title</p>
            <button>Remove from favourites</button>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
