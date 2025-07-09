import { useEffect, useState } from "react";
// import { getFavourites } from "../db/db_apis";
import ReactGA from "react-ga4";
import { UseGetFavourites, addToBasket } from "../db/db_apis";
import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import "../pages/favourites.scss";
import { supabase } from "../config/supabase.config";

const Favourites = () => {
  const session = useSession();

  const { data: faves } = UseGetFavourites(session?.user.id as string);

  const [searchText, setSearchText] = useState<string>("");
  const [filteredFaves, setFilteredFaves] = useState(faves?.data);
  const onSearchChange = (search: string) => {
    setSearchText(search);
  };
  useEffect(() => {
    const newfilteredFavourites = faves?.data?.filter((faveFilter) => {
      return faveFilter.name.toLowerCase().includes(searchText);
    });

    setFilteredFaves(newfilteredFavourites);
  }, [searchText]);

  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, []);

  const handleRemoveFavourite = async (productId: number) => {
    await supabase.from("favourites").delete().eq("product_id", productId);

    const { data } = await supabase
      .from("favourites")
      .select("*")
      .eq("user_id", session?.user.id as string)
      .returns<Database["public"]["Tables"]["favourites"]["Row"][]>();

    setFilteredFaves(data!);
  };

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
              <button
                onClick={() => {
                  handleRemoveFavourite(fave.product_id);
                }}
              >
                Remove from favourites
              </button>
              <button
                onClick={() =>
                  addToBasket(fave.product_id, session?.user.id as string)
                }
              >
                Add to cart
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Favourites;
