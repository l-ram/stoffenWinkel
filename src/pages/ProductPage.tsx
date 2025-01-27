import { useState } from "react";
import { useParams } from "react-router-dom";
import { ExpandMoreOutlined } from "@mui/icons-material";
import "./productPage.scss";
import { PRODUCTS } from "../db/products";
import "../components/productPage/productImageSlider.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Rating,
} from "@mui/material/";
import ProductSelector from "../components/productPage/ProductSelector";
import { UseGetProductRatings, useGetProductPage } from "../db/db_apis";
import CreateReview from "../components/CreateReview";
import ListReviews from "../components/ListReviews";
import { useSession } from "../context/SessionContext";
import AddToFavourites from "../components/productPage/AddToFavourites";
import { Session } from "@supabase/supabase-js";

const ProductPage = () => {
  // Product routing

  const { productId } = useParams();
  let convert: number = 0;
  if (productId) {
    convert = parseInt(productId.slice(1), 10);
  }

  const { data: product } = useGetProductPage(convert);

  // State for product
  const [selectProduct, setSelectProduct] = useState<string>("wood");

  const session = useSession();

  const { data } = UseGetProductRatings(convert);

  const total = data?.data?.reduce((acc, current) => acc + current.rating, 0);
  const numberOfRatings = data?.data?.length;

  let average = 0;

  if (total && numberOfRatings) {
    average = total / numberOfRatings;
  }

  console.log("avg", average);

  const handleSelectProduct = (e: React.MouseEvent<HTMLImageElement>) => {
    const product = e.currentTarget.getAttribute("data-key");
    if (product) {
      setSelectProduct(product);
    }
  };

  const ProductRating = ({ average }: { average: number }) => {
    if (total === 0) {
      return (
        <div>
          <p>No ratings yet!</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>User rating:</p>
          <Rating value={average} precision={0.1} readOnly />
          <p>{`${average}`}</p>
        </div>
      );
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

          <ProductRating average={average} />

          {/* Favourite */}
          <AddToFavourites session={session as Session} convert={convert} />
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
            productId={convert}
          />
          <ListReviews productId={convert} />
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
