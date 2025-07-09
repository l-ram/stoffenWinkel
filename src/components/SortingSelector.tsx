interface SortingSelector {
  handleSorting: (e: any) => void;
}

const SortingSelector = ({ handleSorting }: SortingSelector) => {
  return (
    <div className="sortingSelector">
      <select onClick={handleSorting} id="">
        <option value={"null"}>Sort by: (Default) Name</option>
        <option value={"low"}>Lowest Price</option>
        <option value={"high"}>Highest Price</option>
      </select>
    </div>
  );
};

export default SortingSelector;
