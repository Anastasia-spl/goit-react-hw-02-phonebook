const Filter = ({ value, onFilterChange }) => {
  return (
    <div className="filter-wrapper">
      <h3>Find contacts by name:</h3>
      <input type="text" value={value} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
