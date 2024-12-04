import { useState } from "react";
import { UseAddToFavourites } from "../../db/db_apis";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Session } from "@supabase/supabase-js";

interface IAddToFavourites {
  session: Session;
  convert: number;
}

const AddToFavourites = ({ session, convert }: IAddToFavourites) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isSuccess, isError } = UseAddToFavourites(
    session?.user.id as string,
    convert
  );

  const addProductToFavourites = () => {
    if (!session?.user.id) {
      setErrorMessage("You must be logged in to add favourites.");
      return;
    }

    mutate(undefined, {
      onSuccess: () => {
        setIsFavourite(true);
        setErrorMessage(null);
      },
      onError: (error: Error) => {
        if (error.message.includes("already exists")) {
          setErrorMessage("This product is already in your favourites!");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      },
    });
  };

  return (
    <div>
      {isFavourite ? (
        <Favorite style={{ color: "red" }} onClick={addProductToFavourites} />
      ) : (
        <FavoriteBorder onClick={addProductToFavourites} />
      )}

      {errorMessage && (
        <p style={{ color: "red", marginTop: "8px" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AddToFavourites;
