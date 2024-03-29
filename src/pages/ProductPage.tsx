import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectedProduct } from "../types/types";
import { ExpandMoreOutlined } from "@mui/icons-material";
import "./productPage.scss";
import { PRODUCTS } from "../db/products";
import "../components/productPage/productImageSlider.scss";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material/";
import ProductSelector from "../components/productPage/ProductSelector";
import { useGetProductPage } from "../db/db_apis";
import CreateReview from "../components/CreateReview";
import ListReviews from "../components/ListReviews";
import { useSession } from "../context/SessionContext";

const ProductPage = () => {
  // Product routing

  const { productId } = useParams();
  let convert: number = 0;
  if (productId) {
    convert = parseInt(productId.slice(1), 10);
  }

  const { data: product, isError, isLoading } = useGetProductPage(convert);

  // State for product
  const [selectProduct, setSelectProduct] = useState<string>("wood");
  const [currentProduct, setCurrentProduct] = useState<SelectedProduct[0]>();

  useEffect(() => {
    const current = PRODUCTS[selectProduct];
    setCurrentProduct(current);
  }, [selectProduct]);

  const session = useSession();

  const selectedProductImages = PRODUCTS[selectProduct].map((x) => x.images)[0];

  const handleSelectProduct = (e: React.MouseEvent<HTMLImageElement>) => {
    const product = e.currentTarget.getAttribute("data-key");
    if (product) {
      setSelectProduct(product);
    }
  };

  return (
    <div className="productPage">
      <section className="product">
        <div className="product productImage ">
          <img src={product?.image_url as string}></img>
        </div>
        <div className="product productInfo ">
          <h4 className=" productInfo__subTitle">{product?.category_id}</h4>
          <h1 className=" productInfo__title">{product?.name}</h1>

          {/* Product Selector */}

          <ProductSelector
            handleSelectProduct={handleSelectProduct}
            products={PRODUCTS}
            selectedProduct={selectProduct}
          />

          <h1 className="productInfo__price">€{product?.price}</h1>

          <div className="productInfo__info"></div>

          <Accordion
            style={{ width: "100%", margin: "0.5rem 0 0.5rem 0" }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Product Info
            </AccordionSummary>
            <AccordionDetails>{product?.short_description}</AccordionDetails>
          </Accordion>
          <Accordion style={{ width: "100%", margin: "0.5rem 0 0.5rem 0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Dimensions
            </AccordionSummary>
            <AccordionDetails>{product?.long_description}</AccordionDetails>
          </Accordion>
        </div>

        <section className="reviews">
          <CreateReview
            userName={session?.user.user_metadata.first_name}
            userId={session?.user.id}
            productId={product?.product_id}
          />
          <ListReviews productId={product?.product_id} />
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
