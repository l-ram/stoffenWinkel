import "../pages/products.css";
import { addToBasket } from "../db/db_apis";
import { useGetProducts } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import { useState } from "react";
import { Database } from "../types/db";
import { CategorySelector } from "../components/CategorySelector";

const Products = () => {
  const [page, setPage] = useState(1);

  const [productState, setProductState] = useState<
    Database["public"]["Tables"]["catalog"]["Row"][]
  >([]);

  const { data: products, isLoading, isError, error } = useGetProducts(page);
  setProductState(products);

  const [isFiltered, setFilter] = useState(false);
  const [isSorted, setSorting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const categories = ["Fabric", "Wool", "Tools"];

  const handleSelectedCategory = (e: HTMLParagraphElement) => {
    e.preventDefault();
    setProductState(
      productState.filter((cat) => cat.category_id === e.event.target)
    );
    setSelectedCategory(e.event.target as string);
  };

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

        <CategorySelector
          handleSelectedCategory={handleSelectedCategory}
          isfiltered={isFiltered}
          selected={selectedCategory}
        />

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
