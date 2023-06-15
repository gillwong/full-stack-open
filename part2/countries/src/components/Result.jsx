import { useState } from "react"
import Countries from "./Countries"
import Country from "./Country"
import { useEffect } from "react"

const Result = ({ countries, query }) => {
  const [country, setCountry] = useState(null)

  const filteredCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(query.toLowerCase())
  ))

  useEffect(() => {
    setCountry(null)
  }, [query])

  const showCountry = (cca3) => {
    setCountry(countries.find(country => country.cca3 === cca3))
  }
  
  if (country || filteredCountries.length === 1) {
    return (
      <Country country={country || filteredCountries[0]} />
    )
  }
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (filteredCountries.length > 1) {
    return (
      <Countries countries={filteredCountries} handleClick={showCountry} />
    )
  }
  return (
    <p>No matches found</p>
  )
}

export default Result