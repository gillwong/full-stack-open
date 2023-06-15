const Search = ({ value, handleChange }) => (
  <div>
    find countries
    <input value={value} onChange={handleChange} />
  </div>
)

export default Search