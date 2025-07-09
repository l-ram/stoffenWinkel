import "./listReviews.scss";
import { UseGetReviews } from "../db/db_apis";
import { Rating } from "@mui/material";

interface ListReviewsProps {
  productId: number;
}

const ListReviews = ({ productId }: ListReviewsProps) => {
  console.log("product id:", productId);
  const { data, error } = UseGetReviews(productId);

  error ? console.log(error.message) : console.log("reviews:", data);
  return (
    <div>
      {!data ? (
        <h4>Be the first to review!</h4>
      ) : (
        <div>
          <h1>Reviews</h1>
          {data.data?.map((r, idx) => (
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
