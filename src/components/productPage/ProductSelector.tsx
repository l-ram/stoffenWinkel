import { SelectedProduct } from "../../types/types";
import "./productSelector.scss";

interface ProductSelectorProps {
  selectedProduct: string;
  products: SelectedProduct;
  handleSelectProduct: (e: any) => void;
}

const ProductSelector = ({
  products,
  handleSelectProduct,
  selectedProduct,
}: ProductSelectorProps) => {
  const arrayKeys = Object.keys(products);
  const arrayValues = Object.values(products);
  console.log(arrayValues);

  return (
    <>
      <div className="productSelector">
        <ul className="productSelector__imageList">
          {arrayValues.map((x, idx) =>
            x.map((y) => (
              <li>
                <img
                  className={
                    selectedProduct === arrayKeys[idx]
                      ? "productSelector__select"
                      : ""
                  }
                  data-key={arrayKeys[idx]}
                  style={{ height: "100%" }}
                  key={y.title}
                  src={y.images[0]}
                  onClick={(e) => {
                    handleSelectProduct(e);
                  }}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default ProductSelector;
