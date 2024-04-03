import { useEffect, useState } from "react";
import "./ListReviews.scss";
import { UseGetReviews } from "../db/db_apis";
import { IListReviews } from "../types/types";
import { Rating } from "@mui/material";

interface ListReviewsProps {
  productId?: number;
}

const ListReviews = ({ productId }: ListReviewsProps) => {
  const [reviews, setReviews] = useState<IListReviews[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const { data, error } = UseGetReviews(productId as number);

  useEffect(() => {
    setIsLoading(true);
    error ? setIsError(error?.message) : setIsError(null);
    data ? setReviews(data.data) : setIsError("undefined");
  }, [data]);

  console.log("reviews for current product:", reviews);

  return (
    <div>
      {!reviews ? (
        <h4>Be the first to review!</h4>
      ) : (
        <div>
          <h1>Reviews</h1>
          {reviews?.map((r, idx) => (
            <div key={idx}>
              <img
                src={`https://igfmaugvvetikklloxpe.supabase.co/storage/v1/object/public/UserAvatars/${r.user_id}`}
              />
              <div>{r.user_name}</div>
              <p>{r.timestamp}</p>

              <Rating name="rating" value={r.rating} readOnly />
              <h4>{r.title}</h4>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListReviews;
