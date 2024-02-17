import React from "react";

interface CategorySelector {
  isFiltered: boolean;
  categories: string[];
  selected: string;
}

const CategorySelector = ({
  isFiltered,
  categories,
  selected,
}: CategorySelector) => {
  return (
    <div className="categorySelector">
      <ul>
        {categories.map((x) => (
          <li>
            <p onClick={() => {}}>{x}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
