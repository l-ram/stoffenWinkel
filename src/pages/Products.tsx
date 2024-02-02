import { useEffect, useState } from "react";

interface fakeProducts {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const Products = () => {
  const [data, setData] = useState<fakeProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((products) => setData(products))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const num: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log(data);

  const convert = "one";

  return (
    <div>
      Products
      {data.map((x) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "75%",
            borderStyle: "dashed",
            border: "1, dashed, grey",
            margin: 10,
          }}
          key={x.id}
        >
          <h1>{x.title}</h1>
          <h2>{x.category}</h2>
          <img width={"50%"} src={x.image}></img>
          <span>{x.description}</span>
        </div>
      ))}
    </div>
  );
};
export default Products;
