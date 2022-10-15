const key = '016f2682b58c4b179eb91909221310';
const base = 'http://api.weatherapi.com/v1';


const getForcast = async (city) => {
    const fMethod = '/forecast.json';
    const query = `?key=${key}&q=${city}&days=3`;
    const response = await fetch(base + fMethod + query);
    const data = await response.json();
    return data;
}



getForcast('cairo')
    .then(data => console.log(data))
    .catch(err => console.log(err));



const cityForm = document.querySelector('.city-form');
const weatherContainer = document.querySelector('.weather-main');
const cityName = document.querySelector('.city-name');
const daysRow = document.querySelector('.days-row');


const updateUI = (data) => {
    const weather = data.weather;
    cityName.innerHTML = `
    <h1 class="text-white text-center mt-3 city-name">${weather.location.name}</h1>
    `
    let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    daysRow.innerHTML = `
        <div class="col-lg-4 text-center border-end border-2 border-dark">
            <h3 class="text-white day-0">${days[new Date(weather.forecast.forecastday[0].date).getDay()]}</h3>
        </div>
        <div class="col-lg-4 text-center border-end border-2 border-dark">
            <h3 class="text-white">${days[new Date(weather.forecast.forecastday[1].date).getDay()]}</h3>
        </div>
        <div class="col-lg-4 text-center">
            <h3 class="text-white">${days[new Date(weather.forecast.forecastday[2].date).getDay()]}</h3>
        </div>
    `


   

    weatherContainer.innerHTML = `
    
            <div class="col-lg-4 border-end border-2 border-dark pt-4">
            <h2 class="temp display-4 fw-bold">${weather.current.temp_c
        }&degC</h2>
            <img src="${weather.current.condition.icon}" alt="">
        <div class="my-3">${weather.current.condition.text}</div>

            <div class=" pt-3 pb-5 d-flex justify-content-around">
                <div class="humidity">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${weather.current.humidity}%</span>
                </div>
                <div class="humidity">
                    <i class="fa-solid fa-wind"></i>
                    <span>${weather.current.wind_kph}Km/h</span>
                </div>
                <div class="humidity">
                    <i class="fa-regular fa-compass"></i>
                    <span>${weather.location.country}</span>
                </div>
            </div>
        </div>

        <div class="col-lg-4 border-end border-2 border-dark pt-4">
            <div>
                <img src="${weather.forecast.forecastday[1].day.condition.icon}">
            </div>
            <div class="my-3">${weather.forecast.forecastday[1].day.condition.text}</div>
            <div class="temp-min-max">
                <h3 class="temp display-4 fw-bold">${weather.forecast.forecastday[1].day.maxtemp_c
        }</h3>
                <h6>${weather.forecast.forecastday[1].day.mintemp_c}&degC</h6>
            </div>
        </div>
        <div class="col-lg-4 border-end border-2 border-dark pt-4">
            <div>
                <img src="${weather.forecast.forecastday[2].day.condition.icon}">
            </div>
            <div class="my-3">${weather.forecast.forecastday[2].day.condition.text}</div>
            <div class="temp-min-max">
                <h3 class="temp display-4 fw-bold">${weather.forecast.forecastday[2].day.maxtemp_c
        }</h3>
                <h6>${weather.forecast.forecastday[2].day.mintemp_c}&degC</h6>
            </div>
        </div>
       
        </div>
    `
}
const updateCity = async (city) => {
    // console.log(city);
    const weather = await getForcast(city);
    return {
        weather: weather
    }
}


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})

