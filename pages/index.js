import Head from 'next/head'
import moment from 'moment-timezone';
import Weather from '../components/weather';
import City from '../components/city';
import Form from '../components/form';
import Description from '../components/description';
import Footer from '../components/footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ locationProps, countryProps, weatherProps, mapsApiKey, openWeatherKey }) => {
  const [weather, setWeather] = React.useState(weatherProps)
  const [location, setLocation] = React.useState(locationProps)
  const [country, setCountry] = React.useState(countryProps)
  const [showForm, setShowForm] = React.useState(false)
  const onCityClick = () => setShowForm(true)
  const onFormClick = async () => {
    let city = document.querySelector('input').value

    if(city.length === 0) {
      setShowForm(false)
      toast.error("City not found!", {
        position: "bottom-right"
      })
    }else  {
      let search = await searchCity(city, mapsApiKey, openWeatherKey)
      setWeather(search.weatherProps)
      setCountry(search.countryProps)
      setLocation(search.locationProps)

      setShowForm(false)
    }
  }
  

  if(weather === null) {
    toast.error("City not found! Please search new City.", {
      position: "bottom-right"
    })
  }



  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/weather-icons.min.css"></link>
      </Head>

      {
        weather !== null ? 
        <main className={`container ${weather.class} ${weather.type}`}>
          <div>
            { showForm ? <Form location={location} country={country} onBtnClick={onFormClick} /> : <City location={location} country={country} onBtnClick={onCityClick} /> }
          </div>
          <Weather weather={weather} />
          <Description weather={weather} />
          <Footer />
        </main> :
        <main className={`container`}>
          <Form location={'Lisbon'} country={''} onBtnClick={onFormClick} />
        </main>
      }
      <ToastContainer />
    </div>
  )
}

Home.getInitialProps = async ({ req }) => { 
  let locationProps =  null
  let countryProps = null
  let lat = null
  let lng = null
  let res = null
  let json = null
  let weatherProps = null
  let iapiKey = process.env.NEXT_SERVER_IAPI_API || null
  let openWeatherKey = process.env.NEXT_SERVER_OPENWEATHER_API || null
  let mapsApiKey = process.env.NEXT_SERVER_MAPS_API || null
  
  if(req) {
    // Get client IP
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    
    // Fetch location from client
    let ipapiUrl = `http://api.ipapi.com/${ip}?access_key=${iapiKey}&format=1`
    let res = await fetch(ipapiUrl)
    json = await res.json()

    locationProps = json.region_name
    countryProps = json.country_code
    lat = json.latitude
    lng = json.longitude
  }

  console.log(json)

  if(locationProps !== null) {
    weatherProps = await getWeather({ lat , lng, mapsApiKey, openWeatherKey })
  }else {
    locationProps = null
    countryProps = null
    weatherProps = null
  }
  
  
  return {
    locationProps,
    countryProps,
    weatherProps,
    mapsApiKey,
    openWeatherKey
  }
}


const classMap = (id) => {
  return `bg${id.toString().slice(0, 1)}`
}

const searchCity = async (locationProps, mapsApiKey, openWeatherKey) => {
  let openMapsrUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationProps}&key=${mapsApiKey}`
  let res = await fetch(openMapsrUrl)
  let json = await res.json()

  if(json.results.length > 0) {
    let { lat , lng } = json.results[0].geometry.location
    let weatherProps = await getWeather({ lat , lng, mapsApiKey, openWeatherKey })
    return {
      locationProps,
      countryProps: null,
      weatherProps
    }
  }else {
    toast.error("City not found!", {
      position: "bottom-right"
    })
  }
}

const getWeather = async ({ lat , lng, mapsApiKey, openWeatherKey }) => {
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&APPID=${openWeatherKey}&units=metric`
  let res = await fetch(openWeatherUrl)
  let json = await res.json()

  let mapsrUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${json.current.sunrise}&key=${mapsApiKey}`
  let mapsRes = await fetch(mapsrUrl)
  let mapsJson = await mapsRes.json()

  let weather = {
    sunrise: moment.unix(json.current.sunrise).tz(mapsJson.timeZoneId).format('HH:mm'),
    sunset: moment.unix(json.current.sunset).tz(mapsJson.timeZoneId).format('HH:mm'),
    temp_current: parseInt(json.current.temp),
    temp_min: parseInt(json.daily[0].temp.min),
    temp_max: parseInt(json.daily[0].temp.max),
    humidity: json.current.humidity,
    uvi: json.current.uvi,
    wind_speed: json.current.wind_speed,
    wind_deg: json.current.wind_deg,
    weather: json.current.weather,
    class: classMap(json.current.weather[0].id),
    type: json.current.dt > json.current.sunrise && json.current.dt < json.current.sunset ? 'day' : 'night'
  } 

  return weather
}

export default Home