const apiKey = "adbbb1d1e07578a921068c4263870518";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//We called API from open weather which connects to the server
const searchInput = document.querySelector(".search-input");
const button = document.querySelector(".button");
const weatherIcon = document.querySelector(".weather-icon");

//to get the data from the server we have to write asynchronous function
async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    //first respone fetches data from the api then we have to convert it to JSON format
    let data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = `${data.name}`;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°c`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "./images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

button.addEventListener("click", function () {
  checkWeather(searchInput.value);
});
