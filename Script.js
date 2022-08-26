let now = new Date();
let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentDate = now.getDate();
let day = Days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${now.getHours()}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${now.getMinutes()}`;
}
let month = months[now.getMonth()];

let h6 = document.querySelector("#current-date");
h6.innerHTML = `${day}, ${month}, ${currentDate}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minute}`;

function myLocation(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myLocation);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentPosition);

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let h6 = document.querySelector("#current-temp");
  h6.innerHTML = `${currentTemp} °C`;
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city.toUpperCase().trim();
}
let form = document.querySelector("#search-city");
form.addEventListener("click", searchCity);

let apiKey = "1198758847d63b62f48537f6840537aa";
let searchInput = document.querySelector("#search-input");
let city = searchInput.value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
