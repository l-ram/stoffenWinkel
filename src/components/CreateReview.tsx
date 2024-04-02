import { FormEvent, useEffect, useState } from "react";
import "./createReview.scss";
import { ICreateReview } from "../types/types";
import { Box, Rating, CircularProgress } from "@mui/material";
import { Error, CheckCircleOutline } from "@mui/icons-material";
import { supabase } from "../config/supabase.config";

interface CreateReviewProps {
  userId?: string;
  userName?: string;
  productId?: number;
}

const CreateReview = ({ userId, userName, productId }: CreateReviewProps) => {
  const [rating, setRating] = useState<number>(0);

  const [userReview, setUserReview] = useState<ICreateReview>({
    user_id: userId as string,
    product_id: productId as number,
    rating: rating as number,
    title: "",
    body: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

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

  const handleReviewSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const { data, error } = await supabase
      .from("reviews")
      .insert(userReview)
      .select("*");
    if (error) {
      setIsError(error.message);
    }
    if (data) {
      setIsLoading(false);
      setIsSuccess(true);
    }
    console.log(data);
    return data;
  };

  useEffect(() => {}, []);

  return (
    <div>
      {!isSuccess && userName && (
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

      {isSuccess && (
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
