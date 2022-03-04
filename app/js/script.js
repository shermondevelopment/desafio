const API_KEY = 'e212d7c4b9862f1d992244d80beaee96';

async function definePositionLatitudeAndLongitude(position) {
  const { latitude, longitude } = position.coords;
  const response = await apiRequesLocale(latitude, longitude)
  defineLayoutOfTimeAndScreen(response.weather[0].icon, response.main.temp, response.main.humidity, response.weather[0].description, response.wind.speed)
}

const captureLocation = () => {
  navigator.geolocation ?  
    navigator.geolocation.getCurrentPosition((position) => definePositionLatitudeAndLongitude(position)) : alert('seu navegador não suporta este recurso');
}

const apiRequesLocale = async  (latitude, longitude) => {
   const request = await 
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br&units=metric`)
   return await request.json()
}

const defineLayoutOfTimeAndScreen = (figure, temperature, umidity, description, wind) => {
  const image = documents('[data-figure]')
  const temperatura = documents('[data-temperature]')
  const umidade = documents('[data-umidity]')
  const descriptor = documents('.title-descriptor')
  const vento = documents('[data-wind]')
  image.src = `http://openweathermap.org/img/wn/${figure}@2x.png`;
  temperatura.innerHTML = `${Math.floor(temperature)} <sup>°C</sup>`
  umidade.innerHTML = `Umidade: ${umidity}%`;
  vento.innerHTML = `Vento:  ${Math.floor(wind)} km/h`
  descriptor.innerText = description;
}

const documents = (element) => {
 return document.querySelector(element)
}

captureLocation()
defineLayoutOfTimeAndScreen()