import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"

const Weather = ({ city, latitude, longitude }) => {
  const [temp, setTemp] = useState(null)
  const [wind, setWind] = useState(null)
  const [iconCode, setIconCode] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHER_APIKEY}&units=metric`)
      .then(response => response.data)
      .then(data => {
        console.log(data.name)
        setTemp(data.main.temp)
        setWind(data.wind.speed)
        setIconCode(data.weather[0].icon)
      })
      .catch(error => console.error(error))
  }, [latitude, longitude])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p style={{marginBottom: 0}}>temperature {temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`} />
      <p style={{marginTop: 0}}>wind {wind} m/s</p>
    </div>
  )
}

export default Weather