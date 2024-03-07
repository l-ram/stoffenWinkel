import { FormEvent, useEffect, useState } from "react";
import { BinResult, CutInput, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const ProductPageCutting = () => {
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

    console.log("div key", key);

    if (key) {
      const keyNumber = parseInt(key, 10);
      const indexOfCutToRemove = cuts.findIndex((cut) => cut.id === keyNumber);
      const cutsAfterRemove = cuts.splice(indexOfCutToRemove);
      setCuts(cutsAfterRemove);
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
    <div
      style={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
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
                    <div>Cut id: {l.id}</div>
                    <div>Length: {l.length}</div>
                    <div>Amount: {l.count}</div>
                    <IconButton
                      style={{ flexGrow: 2, fontSize: 12 }}
                      color="error"
                      data-key={l.id}
                      onClick={(e) => {
                        handleRemoveCut(e);
                      }}
                    >
                      <Delete data-key={l.id} style={{ width: "25px" }} />
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
