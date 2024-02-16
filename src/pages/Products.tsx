import "../pages/products.css";
import { addToBasket } from "../db/db_apis";
import { useGetProducts } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import { useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);

  const { data: products, isLoading, isError, error } = useGetProducts();

  return (
    <div>
      <main>
        {isLoading && <CircularProgress />}
        {isError && <p>{error.message}</p>}

        <div className="pages">
          <button>Previous page</button>
          <span> {page} </span>
          <button>Next page</button>
        </div>

        <section className="cards">
          {products?.data?.map((product) => (
            <div key={product.product_id} className="card">
              <div className="card__image-container">
                <img src={product.image_url as string} />
              </div>
              <div className="card__content">
                <p className="card__title text--medium">
                  {product.category_id}
                </p>
                <div className="card__info">
                  <p className="text--medium">{product.name}</p>
                  <button
                    className="card__price"
                    onClick={() => {
                      addToBasket(product.product_id);
                    }}
                  >
                    Add to basket
                  </button>
                  <p className="card__price text--medium">€{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
export default Products;
