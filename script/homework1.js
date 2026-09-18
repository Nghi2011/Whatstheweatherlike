//Bài tập 2:
//Em xin phép dùng API của Weather API thay cho OpenWeatherMap API vì chưa đủ điều kiện với các chinh sách đăng ký lấy API keyư
const API_URL = "http://api.weatherapi.com/v1/forecast.json?key=a4929edf079142fba5244445250507&q="
const getCityInformation = document.getElementById("cityweatherForecast")
const btnSubmit = document.getElementById("btnSubmit")
const preWeatherForecastContainer = document.getElementById("currentWeatherForecastContainer")
let weatherForecastContainer1 = document.getElementById("weatherForecast1")
let weatherForecastContainer2 = document.getElementById("forecastDay")
const CityName_Process = cityName =>{
    let newCityName = cityName.toLowerCase()
    // let newCityName1 = newCityName.normalize("NFD").replace(/\[Diacritics]/g,"")
    return newCityName
}
let city = "Đà Nẵng"
let submitTime= 0
const fetchAPIData= data =>{
    submitTime ++
    console.log(data)
    const currentWeather = data.current
    const cityLocation = data.location
    const cityWeatherForecast = data.forecast.forecastday
    let time_And_DateArray = currentWeather.last_updated.split(" ")
    console.log(time_And_DateArray)
    const newWeatherForecastContainer=`
    <div id="city_TimeAndDateWithWeatherForecast" class="container">
            <div id="cityTimeAndDate">
                <time datetime="${currentWeather.last_updated}">Bây giờ là ${currentWeather.last_updated}</time>
                <p> ${time_And_DateArray[0]} hiện tại là ${time_And_DateArray[1]}</p>
                <p class="fs-2"> ${cityLocation.country}</p>
                <p class="fs-2 fw-light"> ${currentWeather.temp_c}ºC</p>
                <p>Cảm giác như: ${currentWeather.feelslike_c}ºC</p>
            </div>
            <div id="currentWeatherCondition"><img src="${currentWeather.condition.icon}" alt="Điều kiện thời tiết" style="width: 200px;"></div>
            <div id="weatherForecast">
                <ul>
                    <li>Giáng thủy: ${currentWeather.precip_in} in</li>
                    <li>Độ ẩm: ${currentWeather.humidity} %</li>
                    <li>Tốc độ gió: ${currentWeather.wind_kph} km/h</li>
                </ul>
            </div>
        </div>
        <div class="container mb-3 d-flex " style="gap: 10px;" id="searchCityWeatherForecast">
            <input class="form-control w-25" type="text" id="cityweatherForecast" placeholder="Tìm thời tiết của một thành phố/tỉnh" aria-label="default input example">
            <button type="button" class="btn border border-black bg-black text-light" id="btnSubmit" onclick="">Tìm kiếm</button>
            <div id="icon"class="border border-black p-1 rounded">
                <i class="fa-solid fa-location-dot fa-xl"></i>
            </div>
        </div>
   `
   weatherForecastContainer1.innerHTML+=newWeatherForecastContainer
   if (!submitTime === 1){
    cityWeatherForecast.forEach(function(day){
        let forecastEachDay = `
        <div class="forecastDate">
            <p>${day.date}</p>
            <img src="${day.day.condition.icon}" alt="">
            <p>${day.day.maxtemp_c}ºC / ${day.day.mintemp_c}ºC</p>
        </div>`
        weatherForecastContainer2.innerHTML+=forecastEachDay
   })
    
   }
}
// let city1 = CityName_Process(city)11% <div class="shadow-lg p-3 mmaxb-5 bg-body-tertiary border border-black rounded container" style="background: #92C7CF;width: 50%;"id="newWeatherForecastContainer">    </div>

btnSubmit.addEventListener("click",function(){
    if (getCityInformation.value ===""){
        alert("Vui lòng nhập đầy đủ đủ tên về thành phố bạn muốn xem dự báo thời tiết!")
    }
    else{
        alert("chào")
        let getCityName = getCityInformation.value
        let processedCityName =CityName_Process(getCityName)
        weatherForecastContainer1.removeChild(preWeatherForecastContainer)
        let fetchData = async ()=>{
            try{
                await fetch(API_URL+processedCityName+"&days=5")
                .then(response => response.json())
                .then(data =>fetchAPIData(data))
                .catch(error => console.error("Lỗi khi fetch API!",error))
            }
            catch(error){
                alert("Có lỗi khi trích xuất dữ liệu!",error)
            }
        }
        fetchData()
    }
})