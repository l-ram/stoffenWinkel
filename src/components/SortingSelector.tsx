interface SortingSelector {
  handleSorting: (e: any) => any;
}

const SortingSelector = ({ handleSorting }: SortingSelector) => {
  return (
    <div className="sortingSelector">
      <select name="Sort by:" id="" defaultValue={"Sort by:"}>
        <option defaultValue={"Sort by:"} value={"low"}>
          Sort by:
        </option>
        <option onClick={handleSorting} value={"low"}>
          Lowest Price
        </option>
        <option onClick={handleSorting} value={"high"}>
          Highest Price
        </option>
      </select>
    </div>
  );
};

export default SortingSelector;
