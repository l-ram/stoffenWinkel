import { useEffect, useState } from "react";
// import { getFavourites } from "../db/db_apis";
import ReactGA from "react-ga4";
import { UseGetFavourites } from "../db/db_apis";
import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import "../pages/favourites.scss";

const Favourites = () => {
  const session = useSession();

  const { data: faves } = UseGetFavourites(session?.user.id as string);

  const [searchText, setSearchText] = useState<string>("");
  const [filteredFaves, setFilteredFaves] = useState(faves?.data);
  console.log(searchText);
  console.log(filteredFaves);
  const onSearchChange = (search: string) => {
    setSearchText(search);
  };
  useEffect(() => {
    const newfilteredFavourites = filteredFaves?.filter((faveFilter) => {
      return faveFilter.name.toLowerCase().includes(searchText);
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
      <div className="grid">
        {filteredFaves?.map(
          (fave: Database["public"]["Tables"]["favourites"]["Row"]) => (
            <div className="grid__card" key={fave.product_id}>
              <p>{fave.name}</p>
              <button>Remove from favourites</button>
              <button>Add to cart</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Favourites;
