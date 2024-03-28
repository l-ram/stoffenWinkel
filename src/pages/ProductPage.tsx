import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectedProduct } from "../types/types";
import { ExpandMoreOutlined } from "@mui/icons-material";
import "./productPage.scss";
import { PRODUCTS } from "../db/products";
import "../components/productPage/productImageSlider.scss";
import ProductImageSlider from "../components/productPage/ProductImageSlider";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material/";
import ProductSelector from "../components/productPage/ProductSelector";
import { useGetOrders, useGetProductPage } from "../db/db_apis";

const ProductPage = () => {
  // Product routing

  const { productId } = useParams();
  let convert: number = 0;
  if (productId) {
    convert = parseInt(productId.slice(1), 10);
  }

  console.log(convert);

  const {} = useGetProductPage(convert);

  // State for product
  const [selectProduct, setSelectProduct] = useState<string>("wood");
  const [currentProduct, setCurrentProduct] = useState<SelectedProduct[0]>();

  useEffect(() => {
    const current = PRODUCTS[selectProduct];
    setCurrentProduct(current);
  }, [selectProduct]);

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
          <ProductImageSlider selectedProductImages={selectedProductImages} />
        </div>
        <div className="product productInfo ">
          <h4 className=" productInfo__subTitle">
            {currentProduct?.[0].subtitle}
          </h4>
          <h1 className=" productInfo__title">{currentProduct?.[0].title}</h1>

          {/* Product Selector */}

          <ProductSelector
            handleSelectProduct={handleSelectProduct}
            products={PRODUCTS}
            selectedProduct={selectProduct}
          />

          <h1 className="productInfo__price">
            €{currentProduct?.[0].price} /pm
          </h1>

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
            <AccordionDetails>{currentProduct?.[0].info}</AccordionDetails>
          </Accordion>
          <Accordion style={{ width: "100%", margin: "0.5rem 0 0.5rem 0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Weight
            </AccordionSummary>
            <AccordionDetails>{currentProduct?.[0].weight}</AccordionDetails>
          </Accordion>
          <Accordion style={{ width: "100%", margin: "0.5rem 0 0.5rem 0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Dimensions
            </AccordionSummary>
            <AccordionDetails>{currentProduct?.[0].size}</AccordionDetails>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
