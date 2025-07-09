interface CategorySelector {
  categories: string[];
  selected: string;
  handleSelectedCategory: (e: any) => void;
}

const CategorySelector = ({
  categories,
  selected,
  handleSelectedCategory,
}: CategorySelector) => {
  return (
    <div className="categorySelector">
      Filter by category
      <ul style={{ listStyle: "none", cursor: "pointer" }}>
        {categories.map((x) => (
          <li
            key={x}
            style={{
              fontWeight: selected === x ? "bolder" : "normal",
            }}
          >
            <p onClick={handleSelectedCategory}>{x}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
