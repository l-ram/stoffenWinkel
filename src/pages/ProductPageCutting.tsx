import { useEffect, useMemo, useState } from "react";
import { Bin, BinResult, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";
import { Button, Input, FormControl } from "@mui/material";

const ProductPageCutting = () => {
  const [cuts, setCuts] = useState<UserCuts[]>([
    {
      id: 1,
      length: 10,
      count: 12,
    },
    {
      id: 2,
      length: 11,
      count: 12,
    },
    {
      id: 3,
      length: 70,
      count: 1,
    },
    {
      id: 4,
      length: 35,
      count: 1,
    },
    {
      id: 5,
      length: 14,
      count: 7,
    },
  ]);
  const [bins, setBins] = useState<BinResult>({});
  const containerCapacity = 100;

  console.log(bins);

  useEffect(() => {
    console.log("Current state of cuts:", cuts);
    const result = OneDPackingUser(cuts, containerCapacity);
    setBins(result);
  }, [cuts]);

  console.log(bins);

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
    <div>
      <div className="user-input">
        <Form>
          <Input></Input> <Input></Input>
          <Button variant={"outlined"}>Add cut</Button>
        </Form>
      </div>

      <div
        className="cuts-container"
        style={{
          borderRadius: "10px",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          flexDirection: "column",
          width: "75%",
          padding: "1rem",
          backgroundColor: "whitesmoke",
          margin: "1rem",
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
                width: `${containerCapacity}px`,
                backgroundColor: "lightgrey",
                height: "40px",
                margin: "0.5rem",
              }}
            >
              {bin.cutIds.map((cutId, cutIdx) => {
                const cut = cuts.find((cut) => cut.id === cutId);
                const color = colourIdMapping[cutId];
                console.log(cut);
                if (cut) {
                  return (
                    <div
                      key={cutIdx}
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0.1px",
                        borderColor: "lightgray",
                        width: `${cut.length}px`,
                        backgroundColor: `${color}`,
                      }}
                    />
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPageCutting;
