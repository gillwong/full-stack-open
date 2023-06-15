import { useState } from 'react'
import axios from 'axios'
import Search from './components/Search';
import { useEffect } from 'react';
import Result from './components/Result';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        alert(`Unable to fetch ${baseUrl}/api/all`)
        console.error(error)
      })
  }, [])

  return (
    <div>
      <Search
        value={query}
        handleChange={e => setQuery(e.target.value)}
      />
      {countries && <Result query={query} countries={countries} />}
    </div>
  )
}

export default App
