const Countries = ({ countries, handleClick }) => (
  <div>
    {countries.map(country => (
      <p key={country.cca2} style={{ margin: 0 }}>
        {country.name.common}
        <button onClick={() => handleClick(country.cca3)}>
          show
        </button>
      </p>
    ))}
  </div>
)

export default Countries