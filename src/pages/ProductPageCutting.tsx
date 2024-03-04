import { useEffect, useState } from "react";
import { Bin, UserCuts } from "../types/types";
import { OneDPackingUser } from "../hooks/OneDPackingUser";
import { OneDPacking } from "../hooks/OneDPacking";
import { CgArrowLongRightC } from "react-icons/cg";
import { userInfo } from "os";

const ProductPageCutting = () => {
  const [cuts, setCuts] = useState<UserCuts[]>([
    {
      id: 1,
      length: 10,
      count: 12,
    },
    {
      id: 2,
      length: 10,
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
    {
      id: 6,
      length: 40,
      count: 2,
    },
  ]);
  const [bins, setBins] = useState<{ bins: Bin[]; cutIds: number[] }>({
    bins: [],
    cutIds: [],
  });
  const containerCapacity = 100;

  useEffect(() => {
    const result = OneDPackingUser(cuts, containerCapacity);
    setBins(result);
  }, [cuts]);

  console.log("Algo result:", bins.bins, "&", bins.cutIds);

  const color = [
    "#003e5c",
    "#304a7b",
    "#684f90",
    "#a14f94",
    "#d54f85",
    "#f95d69",
    "#ff7c42",
    "#ffa600",
  ];

  const colorCut = [
    "#006fe6",
    "#ffe15e",
    "#ff83ff",
    "#00bf67",
    "#4e0200",
    "#a8fffe",
    "#002f3a",
    "#44b249",
    "#abc8ff",
    "#00ccd3",
  ];

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
        {bins.bins.map((bin, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "row",
              width: `100%`,
              height: "40px",
              backgroundColor: "whitesmoke",
              padding: "0.5rem",
              margin: "0.5rem",
            }}
          >
            <br />
            {bins.cutIds.map(
              (cutId, cutIdx) =>
                cutId === bin.id &&
                cuts[cutIdx] && (
                  <div
                    key={cutIdx}
                    style={{
                      width: `${
                        (cuts[cutIdx].length / containerCapacity) * 100
                      }%`,
                      backgroundColor: `${colorCut[cutIdx]}`,
                      color: "black",
                      padding: "0.5rem",
                    }}
                  >
                    Length: {cuts[cutIdx].length} x {cuts[cutIdx].count}
                  </div>
                )
            )}
          </div>
        ))}
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
