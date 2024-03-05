import { useEffect, useMemo, useState } from "react";
import { Bin, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";

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
  const [bins, setBins] = useState<{ bins: Bin[]; cutIds: number[] }>({
    bins: [],
    cutIds: [],
  });
  const containerCapacity = 100;

  useEffect(() => {
    console.log("Current state of cuts:", cuts);
    const result = OneDPackingUser(cuts, containerCapacity);
    setBins(result);
  }, [cuts]);

  console.log("Current state of cuts after algo:", cuts);

  const color = [
    "#ff1ca0",
    "#ff1bb1",
    "#ff1ac1",
    "#ff19c1",
    "#ff18d1",
    "#ff17e1",
    "#ff16f1",
    "#ff15f1",
    "#ff1501",
    "#ff1411",
    "#ff1321",
    "#ff1221",
    "#ff1131",
    "#ff1041",
    "#fff5f9",
    "#ffe5f0",
    "#ffd6e6",
    "#ffc7dd",
    "#feb8d4",
    "#fea9cb",
    "#fda1c6",
    "#fc9ac1",
    "#fa92bc",
    "#f88bb7",
    "#f684b2",
    "#f47dad",
    "#f177a8",
    "#ef70a3",
    "#ec6a9e",
    "#e96499",
    "#e65e95",
    "#e25990",
    "#de548b",
    "#db4e86",
    "#d64982",
    "#d2457d",
    "#ce4079",
    "#c93c74",
    "#c23a70",
    "#b93a6d",
  ];

  console.log("Current state of cuts after color:", cuts);

  return (
    <div>
      <div
        className="container"
        style={{
          borderRadius: "10px",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          flexDirection: "column",
          width: "75%",
          padding: "1rem",
          backgroundColor: "lightgrey",
        }}
      >
        {bins.bins.map((bin, binIdx) => {
          console.log("Current bin:", bin);
          return (
            <div
              key={binIdx}
              style={{
                display: "flex",
                flexDirection: "row",
                width: `${containerCapacity}px`,
                backgroundColor: "blue",
                height: "40px",
                margin: "0.5rem",
              }}
            >
              {bin.remainingSpace >= 0 &&
                bin.remainingSpace < containerCapacity &&
                bin.remainingSpace !== containerCapacity &&
                bins.cutIds.map((cutId, cutIdx) => {
                  console.log("Cut ID and Bin ID:", cutId, bin.id);
                  console.log("Cut information:", cuts[cutIdx]);
                  console.log("Colour information:", color[cutIdx]);
                  return (
                    cutId === bin.id && (
                      <div
                        key={cutIdx}
                        style={{
                          width: cuts[cutId - 1]
                            ? `${cuts[cutId - 1]?.length}px`
                            : "1px",
                          backgroundColor: `${color[cutId - 1]}`,
                          color: "black",
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: "0.5px",
                        }}
                      ></div>
                    )
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* Display current cuts and their bin IDs */}
      <ul>
        {cuts.map((cut, cutIndex) => (
          <li key={cutIndex}>
            {cut.length} (x{cut.count}) - Bin {bins.cutIds[cutIndex]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPageCutting;
