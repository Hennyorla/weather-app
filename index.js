const formClass = document.getElementsByClassName("weather__search")[0];
const inputClass = document.getElementsByClassName("weather__searchform")[0];
const weatherInfoDiv = document.getElementsByClassName("weather__info")[0];

//get weatherinformation from the api
const getWeatherInfo = async (city) => {

  try {
    const response = await fetch(
      `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key":
            "65978b2449msh64f1c6439bc3541p1716e9jsnf9f13625b048",
          "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        },
      }
    );
    
    // convert json response to javascript object
    const data = await response.json();

    if (!response.ok) {
      return { error: "something went wrong" };
    }
//return the data
    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};
//add event listener to the form
formClass.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = inputClass.value;
  if (city) {
    const weatherInfo = await getWeatherInfo(city);
    console.log(weatherInfo)
    if (weatherInfo.error) {
      console.log(weatherInfo);
    } else {
      weatherInfoDiv.innerHTML = `<div class="weather__card">
        <i class="fa-solid fa-temperature-full"></i>
        <div>
            <p>Real Feel</p>
            <p class="weather__realfeel">${weatherInfo?.current_observation?.condition?.temperature}&#176</p>
        </div>
    </div><div class="weather__card">
        <i class="fa-solid fa-droplet"></i>
        <div>
            <p>Humidity</p>
            <p class="weather__humidity">${weatherInfo?.current_observation?.atmosphere?.humidity}&#176</p>
        </div>
    </div>
    <div class="weather__card">
        <i class="fa-solid fa-wind"></i>
        <div>
            <p>Wind</p>
            <p class="weather__wind">${weatherInfo?.current_observation?.wind?.chill}&#176</p>
        </div>
    </div>
    <div class="weather__card">
        <i class="fa-solid fa-gauge-high"></i>
        <div>
            <p>Pressure</p>
            <p class="weather__pressure">${weatherInfo?.current_observation?.atmosphere?.pressure}&#176</p>
        </div>
    </div>`;
    }
  }
});


