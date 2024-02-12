import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.config";
import "../pages/products.css";
import { addToBasket } from "../db/db_apis";

interface ProductsTable {
  name: string;
  product_id: number;
  category_id: string;
  price: number;
  short_description: string;
  long_description: string;
  image_url: string;
}

const Products = () => {
  // const [loading, setLoading] = useState<boolean>(true);

  const [products, setproducts] = useState<ProductsTable[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("catalog")
        .select("*")
        .returns<ProductsTable[]>();
      if (data === null || error) {
        alert(error.message);
      } else {
        setproducts(data);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <main>
        <section className="cards">
          {products.map((product) => (
            <div key={product.product_id} className="card">
              <div className="card__image-container">
                <img src={product.image_url} />
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
