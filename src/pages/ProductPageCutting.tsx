import { FormEvent, useEffect, useState } from "react";
import { BinResult, CutInput, SelectedProduct, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Delete, ExpandMoreOutlined, PieChart } from "@mui/icons-material";
import "./productPage.scss";
import { PRODUCTS } from "../db/products";
import "../components/productPage/productImageSlider.scss";
import ProductImageSlider from "../components/productPage/ProductImageSlider";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material/";
import ProductSelector from "../components/productPage/ProductSelector";
import PercentageGuage from "../components/productPage/PercentageGuage";

const ProductPageCutting = () => {
  // State for product

  const [selectProduct, setSelectProduct] = useState<string>("wood");

  const [currentProduct, setCurrentProduct] = useState<SelectedProduct[0]>();

  useEffect(() => {
    const current = PRODUCTS[selectProduct];
    setCurrentProduct(current);
  }, [selectProduct]);

  const selectedProductImages = PRODUCTS[selectProduct].map((x) => x.images)[0];

  // State for cutting
  const [lengthInput, setLengthInput] = useState<number>(0);
  const [countInput, setCountInput] = useState<number>(0);
  const [cuts, setCuts] = useState<UserCuts[]>([]);
  const [bins, setBins] = useState<BinResult>({});
  const [percent, setPercent] = useState<number>(1);
  const containerCapacity = 100;

  useEffect(() => {
    const result = OneDPackingUser(cuts, containerCapacity);
    setBins(result);
  }, [cuts]);

  useEffect(() => {
    const percent = calculateWastePercentage(bins);
    setPercent(percent);
  }, [bins]);

  console.log(percent);

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

  const handleSelectProduct = (e: React.MouseEvent<HTMLImageElement>) => {
    const product = e.currentTarget.getAttribute("data-key");
    if (product) {
      setSelectProduct(product);
    }
  };

  const calculateWastePercentage = (bins: BinResult): number => {
    const totalLength = containerCapacity * Object.keys(bins).length;
    const totalRemaining = Object.values(bins).reduce((acc, current) => {
      return acc + current.remainingSpace;
    }, 0);

    const percentage: number = (totalRemaining / totalLength) * 100;
    return percentage;
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

      <div className="userInput">
        <form onSubmit={handleAddCut}>
          <TextField
            style={{
              margin: "0.5rem",
            }}
            size="small"
            label="Length"
            type="number"
            value={lengthInput}
            onChange={handleLengthChange}
          ></TextField>
          <TextField
            style={{
              margin: "0.5rem",
            }}
            size="small"
            label="Count"
            type="number"
            value={countInput}
            onChange={handleCountChange}
          ></TextField>
          <Button
            type="submit"
            style={{
              color: "#64b0b0",
              margin: "0.5rem",
            }}
            variant={"outlined"}
          >
            {" "}
            <Add /> Add cut
          </Button>
        </form>
      </div>

      <section className="cutsArea">
        <h3 className="cutsArea__type">
          {`${selectProduct[0].toUpperCase()}${selectProduct.substring(
            1
          )} dimensions: ${currentProduct?.[0].size}`}{" "}
        </h3>
        <div className="cutsArea__cutsContainer">
          {Object.keys(bins).map((binId) => {
            const bin = bins[binId];
            return (
              <div
                className="cutsArea__cutsContainerBins"
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
        <div className="cutsArea__list">
          <div className="cutsArea__listItem">
            {cuts.length < 1 ? (
              <div>No cuts yet!</div>
            ) : (
              cuts.map((l) => {
                return (
                  <div
                    data-key={l.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: "lightgrey",
                      marginBottom: "0.5rem",
                      borderRadius: "5px",
                      padding: "0.25rem",
                      fontSize: "12px",
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
                        style={{ height: "15px", color: "#64b0b0" }}
                      />
                    </IconButton>
                  </div>
                );
              })
            )}

            <h5>Leftover material</h5>
          </div>

          <PercentageGuage percentage={percent}></PercentageGuage>
        </div>
      </section>
    </div>
  );
};

export default ProductPageCutting;
