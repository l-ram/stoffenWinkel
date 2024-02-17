import "../pages/products.css";
import { addToBasket } from "../db/db_apis";
import { useGetProducts } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import { useState } from "react";
import { Database } from "../types/db";

const Products = () => {
  const [page, setPage] = useState(1);

  const [productState, setProductState] = useState<
    Database["public"]["Tables"]["products"]["Row"][]
  >([]);

  const { data: products, isLoading, isError, error } = useGetProducts(page);
  setProductState(products);

  const [isFiltered, setFilter] = useState(false);
  const [isSorted, setSorting] = useState(false);

  const handleSelectedCategory = (category: string) => {
    productState.filter((cat) => {
      cat.category_id === category;
    });
  };

  const handleSortProducts = () => {};

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

        <div className="category">
          <ul>
            <li>
              <p>Fabric</p>
            </li>
            <li></li>
            <li></li>
          </ul>
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
