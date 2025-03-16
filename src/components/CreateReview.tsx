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
  const [rating, setRating] = useState<number | null>(0);

  const [userReview, setUserReview] = useState<ICreateReview>({
    user_id: userId as string,
    product_id: productId as number,
    user_name: userName as string,
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

    const { data: existing } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId as number)
      .eq("user_id", userId as string);

    if ((existing?.length as number) > 0) {
      setIsError("You have already written a review");
      return;
    }

    console.log(userReview);

    const { data, error } = await supabase
      .from("reviews")
      .insert(userReview)
      .select("*");
    if (error) {
      setIsError(error.message);
      console.log("error:", error.message);
      return;
    }
    if (data) {
      setIsLoading(false);
      setIsSuccess(true);
    }
    return data;
  };

  useEffect(() => {}, [isLoading, isError, isSuccess]);

  const ReviewState = ({
    isLoading,
    isError,
    isSuccess,
  }: {
    isLoading: boolean;
    isError: string | null;
    isSuccess: boolean;
  }) => {
    if (isError) {
      setIsLoading(false);
      return (
        <div>
          <Error />
          <p>{isError}</p>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <CircularProgress />
          <p> Submitting review... </p>
        </div>
      );
    } else if (isSuccess) {
      return (
        <div>
          <CheckCircleOutline />
          <p> Review added! </p>
        </div>
      );
    }
  };

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
                  setRating(newValue);
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

      <ReviewState
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />

      {!userId && <div>Login to leave a review!</div>}
    </div>
  );
};

export default CreateReview;
