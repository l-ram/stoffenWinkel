import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductImageSliderProps {
  selectedProductImages: string[];
}

const ProductImageSlider = ({
  selectedProductImages,
}: ProductImageSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </div>
      </div>
    ),

    prevArrow: (
      <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
          </svg>
        </div>
      </div>
    ),
  };

  return (
    <>
      <Slider {...settings}>
        {selectedProductImages.map((i, idx) => (
          <img key={idx} src={i}></img>
        ))}
      </Slider>
    </>
  );
};

export default ProductImageSlider;
