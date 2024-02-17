interface CategorySelector {
  isFiltered: boolean;
  categories: string[];
  selected: string;
  handleSelectedCategory: (e: any) => void;
}

const CategorySelector = ({
  isFiltered,
  categories,
  selected,
  handleSelectedCategory,
}: CategorySelector) => {
  if (selected) {
  }

  return (
    <div className="categorySelector">
      <ul>
        {categories.map((x) => (
          <li>
            <p onClick={handleSelectedCategory}>{x}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
