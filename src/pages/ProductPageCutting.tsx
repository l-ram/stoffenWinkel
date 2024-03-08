import { FormEvent, useEffect, useState } from "react";
import { BinResult, CutInput, SelectedProduct, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import "./productPage.scss";
import { PRODUCTS } from "../db/products";
import "../components/productPage/productImageSlider.scss";
import ProductImageSlider from "../components/productPage/ProductImageSlider";

const ProductPageCutting = () => {
  // State for product
  const [currentProduct, setCurrentProduct] = useState<SelectedProduct[]>([]);
  const [selectProduct, setSelectProduct] = useState<string>("wood");

  const selectedProductImages = PRODUCTS[selectProduct].map((x) => x.images)[0];
  console.log(selectedProductImages);

  // State for cutting
  const [lengthInput, setLengthInput] = useState<number>(0);
  const [countInput, setCountInput] = useState<number>(0);
  const [cuts, setCuts] = useState<UserCuts[]>([]);
  const [bins, setBins] = useState<BinResult>({});
  const containerCapacity = 100;

  useEffect(() => {
    const result = OneDPackingUser(cuts, containerCapacity);
    setBins(result);
  }, [cuts]);

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLengthInput(Number(event.target.value));
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountInput(Number(event.target.value));
  };

  const handleAddCut = (e: FormEvent) => {
    e.preventDefault();

    const maxId = Math.max(...cuts.map((cut) => cut.id), 0);

    const newCut: CutInput = {
      id: maxId + 1,
      length: lengthInput,
      count: countInput,
    };

    setCuts((prevCuts) => [...prevCuts, newCut]);
  };

  const handleRemoveCut = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    if (key) {
      const keyNumber = parseInt(key, 10);
      const indexOfCutToRemove = cuts.findIndex((cut) => cut.id === keyNumber);
      setCuts((prevCuts) => {
        const updatedCuts = [...prevCuts];
        updatedCuts.splice(indexOfCutToRemove, 1);
        return updatedCuts;
      });
    }
  };

  const colourIdMapping: Record<number, string> = {
    1: "#ff9ccc",
    2: "#ff5ee2",
    3: "#f783ff",
    4: "#7c62b9",
    5: "#8f8dff",
    6: "#8ac3ff",
    7: "#90fdff",
    8: "#88fff1",
    9: "#85ffa9",
  };

  return (
    <div className="productPage">
      <section className="product">
        <div className="product productImage ">
          <ProductImageSlider>
            {selectedProductImages.map((image, index) => {
              return <img key={index} src={image} alt={index.toString()} />;
            })}
          </ProductImageSlider>
        </div>
        <div className="product productInfo ">
          <h1 className=" productInfo__title"></h1>
          <h2 className=" productInfo__subTitle"></h2>
          {/* Product Selector */}
          <p className="productInfo__price"></p>
          <div className="productInfo__info"></div>
        </div>
      </section>

      <div
        className="user-input"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <form onSubmit={handleAddCut}>
          <TextField
            size="small"
            label="Length"
            type="number"
            value={lengthInput}
            onChange={handleLengthChange}
          ></TextField>
          <TextField
            size="small"
            label="Count"
            type="number"
            value={countInput}
            onChange={handleCountChange}
          ></TextField>
          <Button type="submit" variant={"outlined"}>
            {" "}
            <Add /> Add cut
          </Button>
        </form>
      </div>

      <section
        className="cuts-area"
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2rem",
          width: "75%",
        }}
      >
        <div
          className="cuts-container"
          style={{
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1rem",
            backgroundColor: "whitesmoke",
            margin: "0.25rem",
          }}
        >
          {Object.keys(bins).map((binId) => {
            const bin = bins[binId];
            return (
              <div
                key={binId}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: `${containerCapacity * 4}px`,
                  backgroundColor: "lightgrey",
                  height: "40px",
                  margin: "0.5rem",
                }}
              >
                {bin.cutIds.map((cutId, cutIdx) => {
                  const cut = cuts.find((cut) => cut.id === cutId);
                  const color = colourIdMapping[cutId];
                  if (cut) {
                    return (
                      <div
                        key={cutIdx}
                        style={{
                          width: `${cut.length * 4}px`,
                          backgroundColor: `${color}`,
                          borderStyle: "solid",
                          borderWidth: "1px",
                          borderColor: "lightgrey",
                        }}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        <div
          className="cuts-list"
          style={{
            margin: "0.25rem",
            borderRadius: "10px",
            width: "25%",
            backgroundColor: "whitesmoke",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              width: "100%",
              padding: "1rem",
              fontSize: "12px",
            }}
          >
            {cuts.length < 1 ? (
              <div>No cuts yet!</div>
            ) : (
              cuts.map((l) => {
                return (
                  <div
                    data-key={l.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      backgroundColor: "lightgrey",
                      marginBottom: "0.5rem",
                      borderRadius: "1rem",
                      padding: "0.5rem",
                    }}
                  >
                    <div key={"test"}>Cut id: {l.id}</div>
                    <div>Length: {l.length}</div>
                    <div>Amount: {l.count}</div>
                    <IconButton
                      style={{ width: "20px" }}
                      data-key={l.id}
                      onClick={(e) => {
                        handleRemoveCut(e);
                      }}
                    >
                      <Delete
                        data-key={l.id}
                        style={{ height: "17px", color: "teal" }}
                      />
                    </IconButton>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPageCutting;
