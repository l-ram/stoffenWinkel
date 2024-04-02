import { FormEvent, useEffect, useState } from "react";
import "./createReview.scss";
import { ICreateReview } from "../types/types";
import { Box, Rating, CircularProgress } from "@mui/material";
import { Error, CheckCircleOutline } from "@mui/icons-material";
import { useNewReview } from "../db/db_apis";

interface CreateReviewProps {
  userId?: string;
  userName?: string;
  productId?: number;
}

// DB schema
// reviewId: number PK
// FK  - productId + userId
// productid: number
// userId: text
// title: text
// body: text
// rating: number
// creationDate: date

const CreateReview = ({ userId, userName, productId }: CreateReviewProps) => {
  const [rating, setRating] = useState<number>(0);

  const [submitReview, setSubmitReview] = useState<ICreateReview | null>(null);

  const [userReview, setUserReview] = useState<ICreateReview>({
    user_id: userId as string,
    product_id: productId as number,
    rating: rating as number,
    title: "",
    body: "",
  });

  const { isLoading, isError, data, error, refetch } =
    useNewReview(submitReview);

  console.log("error:", isError, "loading:", isLoading, "data:", data);

  const handleReviewChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setUserReview((previousState) => {
      return {
        ...previousState,
        [event.target.name]:
          event.target.name === "rating"
            ? Number(event.target.value)
            : event.target.value,
        [event.target.name]:
          event.target.name === "rating"
            ? Number(event.target.value)
            : event.target.value,
        [event.target.name]:
          event.target.name === "rating"
            ? Number(event.target.value)
            : event.target.value,
      };
    });
  };

  const handleReviewSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitReview(userReview);
  };

  useEffect(() => {
    refetch();
  }, [submitReview]);

  return (
    <div>
      {!data && userName && (
        <div>
          <h3>Write a review</h3>
          <form onChange={handleReviewChange} onSubmit={handleReviewSubmit}>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue as number);
                }}
              />
            </Box>
            <div>
              Title:
              <input name="title" type="text"></input>
            </div>

            <div>
              <textarea name="body" id="" cols={60} rows={10}></textarea>
            </div>

            <button>Submit review</button>
          </form>
        </div>
      )}

      {isLoading && (
        <div>
          <CircularProgress />
          <p> Submitting review... </p>
        </div>
      )}

      {isError && (
        <div>
          <Error />
          <p> Problem submitting review </p>
        </div>
      )}

      {data && (
        <div>
          <CheckCircleOutline />
          <p> Review added! </p>
        </div>
      )}

      {!userId && <div>Login to leave a review!</div>}
    </div>
  );
};

export default CreateReview;
