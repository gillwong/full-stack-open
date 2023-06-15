import Weather from "./Weather"

const Country = ({ country }) => {
  const name = country.name.common
  const capitals = country.capital
  const area = country.area
  const languages = Object.entries(country.languages)
  const flag = country.flags

  return (
    <div>
      <h1>{name}</h1>
      <p>
        capital {capitals.join(', ')}<br />
        area {area}
      </p>
      <h3>languages:</h3>
      <ul>
        {languages.map(language => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={flag.png} alt={flag.alt} />
      <Weather
        city={capitals[0]}
        latitude={country.capitalInfo.latlng[0]}
        longitude={country.capitalInfo.latlng[1]}
      />
    </div>
  )
}

export default Country