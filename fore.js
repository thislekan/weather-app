const weatherStatus = document.getElementById("weather-status");
const currentLocation = document.getElementById("location-details");
const temperature = document.getElementById("temperature");
const metricButton = document.getElementById("metric");
const appBackground = document.getElementsByTagName("body")[0];

const geo_options = {
  enableHighAccuracy: true,
  maximumAge: 40000,
  timeout: 35000
};

if (navigator.geolocation) {
  let WeatherURL = "http://api.openweathermap.org/data/2.5/weather?";
  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    WeatherURL = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + long + "&appid=8129c2a9a70b451d2dc2657a541413dc";

    //receiving data in json format from API call
    fetch(WeatherURL).then(function(data) {
      return data.json();
    }).then(function(lastResponse){
      console.log(lastResponse);
      let info = lastResponse;
      currentLocation.innerHTML = info.name + ", " + info.sys.country;
      weatherStatus.innerHTML = info.weather[0].description;
      let cityTemp;
      cityTemp = info.main.temp - 273;
      temperature.innerHTML = Math.round(cityTemp) + " " + "°" + "C";
      metricButton.addEventListener("click", switchMetricValue);

      function switchMetricValue() {
        if (temperature.innerHTML == Math.round(cityTemp) + " " + "°" + "C") {
          cityTemp = info.main.temp - 459.67;
          temperature.innerHTML = Math.round(cityTemp) + " " + "&deg" + "F";
        }else {
          cityTemp = info.main.temp - 273;
          temperature.innerHTML = Math.round(cityTemp) + " " + "&deg" + "C";
        }
      }
      // toggling background images with specific weather conditions
      let userWeather = info.weather[0];

      if (userWeather.main === "Clouds") {
        if (userWeather.description === "few clouds" || userWeather.description === "scattered clouds") {
          appBackground.style.backgroundImage = "url(" + 'fewclouds.jpg' + ")";
        }else if (userWeather.description === "broken clouds") {
          appBackground.style.backgroundImage = "url(" + 'brokenclouds.jpeg' + ")";
        }else {
          appBackground.style.backgroundImage = "url(" + 'overcast.jpeg' + ")";
        }
      }else if (userWeather.main === "Clear") {
        appBackground.style.backgroundImage = "url(" + 'clearsky1.jpg' + ")";
      }else if (userWeather.main === "Thunderstorm") {
        if (userWeather.description === "light thunderstorm") {
          appBackground.style.backgroundImage = "url(" + 'light-thunder.jpg' + ")";
        }else {
          appBackground.style.backgroundImage = "url(" + 'thunderstorm.jpg' + ")";
        }
      }else if (userWeather.main === "Rain" || userWeather.main === "Drizzle") {
        appBackground.style.backgroundImage = "url(" + 'rain.jpg' + ")";
      }else if (userWeather.main === "Snow") {
        appBackground.style.backgroundImage = "url(" + 'snow.jpeg' + ")";
      }
    }, geo_options);
  });

}
