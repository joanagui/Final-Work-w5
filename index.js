let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let currentTime = document.querySelector("#date");
currentTime.innerHTML = `Last updated on ${day}, ${hour}:${minutes}`;

function showTemperature(response) {
  let description = document.querySelector(".temperature");
  description.innerHTML = Math.round(response.data.main.temp);
  let citySearch = document.querySelector("h1");
  let valueInput = document.querySelector("#valueInput");
  citySearch.innerHTML = `${valueInput.value}`;
  let humidity = response.data.main.humidity;
  let humiDetails = document.querySelector("#humi");
  humiDetails.innerHTML = `Humidity: ${humidity}%`;
  let windValue = response.data.wind.speed;
  let windDetails = document.querySelector("#wind");
  windDetails.innerHTML = `Wind speed: ${windValue} m/s`;
}

function cityName(event) {
  event.preventDefault();
  let apiKey = "17e7458113b38b3d9ab8a6cbf84a6119";
  let city = document.querySelector("#valueInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#formInput");
form.addEventListener("submit", cityName);

let celsius = document.querySelector("#unit");
let farh = document.querySelector("#unit2");

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = (temperature - 32) / 1.8;
}
celsius.addEventListener("click", showCelsius);

function showFarh(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = temperature * 1.8 + 32;
}
farh.addEventListener("click", showFarh);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let description = document.querySelector(".temperature");
  description.innerHTML = `${temp}`;
  let humidity = response.data.main.humidity;
  let humiDetails = document.querySelector("#humi");
  humiDetails.innerHTML = `Humidity: ${humidity}%`;
  let windValue = response.data.wind.speed;
  let windDetails = document.querySelector("#wind");
  windDetails.innerHTML = `Wind speed: ${windValue} m/s`;
}

function positionGeo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "17e7458113b38b3d9ab8a6cbf84a6119";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}
function geoLocater(event) {
  navigator.geolocation.getCurrentPosition(positionGeo);
}

let geo = document.querySelector("#button");
geo.addEventListener("click", geoLocater);
