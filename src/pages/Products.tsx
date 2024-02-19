import "../pages/products.css";
import { addToBasket } from "../db/db_apis";
import { useGetProducts } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import { useEffect, useState } from "react";
import { Database } from "../types/db";
import CategorySelector from "../components/CategorySelector";

const Products = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const [productState, setProductState] = useState<
    Database["public"]["Tables"]["catalog"]["Row"][] | null
  >();

  console.log("useState:", productState);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts(page, itemsPerPage);

products?.

  const totalPages = Math.ceil((products?.count as number) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log(totalPages);

  useEffect(() => {
    setProductState(products?.data);
  }, [products]);

  const [isFiltered, setFilter] = useState<boolean>(false);
  const [isSorted, setSorting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categories = ["All", "Fabric", "Wool", "Needles"];

  const handleSelectedCategory = (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.preventDefault();

    if (e.currentTarget.textContent === "All") {
      setProductState(products?.data);
      return;
    } else {
      const filteredProducts = products?.data?.filter(
        (cat) => cat.category_id === e.currentTarget.textContent
      );
      console.log(filteredProducts);
      setProductState(filteredProducts);
      setSelectedCategory(e.currentTarget.textContent as string);
    }
  };

  return (
    <div>
      <main>
        {isLoading && <CircularProgress />}
        {isError && <p>{error.message}</p>}

        <div className="pages">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span> {`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next page
          </button>
        </div>

        <CategorySelector
          handleSelectedCategory={handleSelectedCategory}
          isFiltered={isFiltered}
          selected={selectedCategory}
          categories={categories}
        />

        <section className="cards">
          {productState?.map((product) => (
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
