import { useState } from "react";
import "./ListReviews.scss";
import ProductRating from "./ProductRating";

interface ListReviewsProps {
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

const ListReviews = ({ productId }: ListReviewsProps) => {
  const [reviews, setReviews] = useState([]);

  return (
    <div>
      {reviews.length < 1 ? (
        <h4>Be the first to review!</h4>
      ) : (
        <div>
          <h3>Reviews</h3>
        </div>
      )}
    </div>
  );
};

export default ListReviews;
