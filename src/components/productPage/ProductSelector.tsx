import { SelectedProduct } from "../../types/types";
import "./productSelector.scss";

interface ProductSelectorProps {
  products: SelectedProduct;
  handleSelectProduct: handleSelectProduct(x) => void;
}

const ProductSelector = ({ products }: ProductSelectorProps) => {
  const arrayKeys = Object.keys(products);
  const arrayValues = Object.values(products);
  console.log(arrayValues);

  return (
    <>
      <div className="productSelector">
        <ul className="productSelector__imageList">
          {arrayValues.map((x) =>
            x.map((y) => (
              <li className="productSelector__select">
                <img
                  style={{ height: "100%" }}
                  key={y.title}
                  src={y.images[0]}
                  defaultValue={arrayKeys[y]}
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
