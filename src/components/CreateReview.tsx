import { FormEvent, useState } from "react";
import "./createReview.scss";
import { ICreateReview } from "../types/types";
import { Box, Rating } from "@mui/material";

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

  console.log(rating);

  const [userReview, setUserReview] = useState<ICreateReview>({
    userId: userId as string,
    userName: userName as string,
    productId: productId as number,
    rating: rating as number,
    title: "",
    body: "",
  });

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

  console.log(userReview);

  const handleReviewSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div>
      {userName && (
        <div>
          <h3>Write a review</h3>
          <form onChange={handleReviewChange}>
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

            <button onSubmit={handleReviewSubmit} type="submit">
              Submit review
            </button>
          </form>
        </div>
      )}

      {!userId && <div>Login to leave a review!</div>}
    </div>
  );
};

export default CreateReview;
