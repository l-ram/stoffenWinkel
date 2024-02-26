import "../pages/products.scss";
import { addToBasket } from "../db/db_apis";
import { useGetProducts } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import { useState } from "react";
import CategorySelector from "../components/CategorySelector";
import SortingSelector from "../components/SortingSelector";
import { useSession } from "../context/SessionContext";

const Products = () => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [isFiltered, setFilter] = useState<boolean>(false);
  const [isSorted, setSorting] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Fabric", "Wool", "Needles"];

  // Products hook
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts(page, itemsPerPage, selectedCategory, isSorted);

  const totalPages = Math.ceil((products?.count as number) / itemsPerPage);
  console.log("total pages:", totalPages);

  // Functions
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSorting = (e: React.MouseEvent<HTMLOptionElement>) => {
    e.preventDefault();
    console.log("click works");
    const sort = e.currentTarget.value as string;

    if (sort === "null") {
      setSorting(null);
    } else {
      setSorting(sort);
    }
  };

  console.log(isSorted);

  const handleSelectedCategory = (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.preventDefault();

    const cat = e.currentTarget.textContent;

    if (cat) {
      setSelectedCategory(e.currentTarget.textContent as string);
    }
  };

  return (
    <div>
      <div className="sorting">
        <div className="pages">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span> {`Page ${page} of ${!totalPages ? "..." : totalPages}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next page
          </button>
        </div>
        <SortingSelector handleSorting={handleSorting} />
      </div>

      <div className="products">
        {isLoading && <CircularProgress />}
        {isError && <p>{error.message}</p>}

        <div className="products__selectionColumn">
          <CategorySelector
            handleSelectedCategory={handleSelectedCategory}
            isFiltered={isFiltered}
            selected={selectedCategory}
            categories={categories}
          />
        </div>

        <div className="products__cards">
          {products?.data?.map((product) => (
            <div key={product.product_id} className="products__card">
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
                      addToBasket(
                        product.product_id,
                        session?.user.id as string
                      );
                    }}
                  >
                    Add to basket
                  </button>
                  <p className="card__price text--medium">€{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagesBottom">
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
    </div>
  );
};
export default Products;
