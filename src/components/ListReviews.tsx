import { useEffect, useState } from "react";
import "./ListReviews.scss";
import { UseGetReviews } from "../db/db_apis";
import { IListReviews } from "../types/types";
import { useSession } from "../context/SessionContext";

interface ListReviewsProps {
  productId?: number;
}

const ListReviews = ({ productId }: ListReviewsProps) => {
  useSession();
  const [reviews, setReviews] = useState<IListReviews[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const { data, error } = UseGetReviews(productId as number);

  useEffect(() => {
    setIsLoading(true);
    error ? setIsError(error?.message) : setIsError(null);
    data ? setReviews(data.data) : setIsError("undefined");
  }, []);

  console.log(isLoading);
  console.log(isError);
  console.log(reviews);

  return (
    <div>
      {!reviews ? (
        <h4>Be the first to review!</h4>
      ) : (
        <div>
          <h1>Reviews</h1>
          {reviews?.map((r, idx) => (
            <div key={idx}>
              <div>{r.user_id}</div>
              <p>{r.timestamp}</p>
              <div>Rating:{r.rating}</div>
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
