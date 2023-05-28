const card = document.querySelectorAll(".card");
const cards = document.getElementById("cards");
// let text = document.getElementById("text");
let form = document.getElementById("form");

let selectedImages = [];
let details = [];
let weatherDataList = [];

const processWeatherData = (data) => {
  console.log("processWeatherData")
  const temperature = (data.list[0].main.temp / 10).toFixed(2);
  const icon = data.list[0].weather[0].icon;
  const feelsLike = data.list[0].main.feels_like;
  const humidity = data.list[0].main.humidity;
  const speed = data.list[0].wind.speed;

  const weatherData = {
    temperature,
    icon,
    feelsLike,
    humidity,
    speed,
  };

  weatherDataList.push(weatherData);
};

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log(weatherDataList);
  console.log(selectedImages);
  console.log("addEventListener")
  const searchMessage = document.getElementById("search-result");
  searchMessage.innerHTML = "";
  // console.log(searchMessage.innerHTML == "");
  // searchMessage.innerHTML == "" ? searchMessage.innerHTML : "" ;
  // console.log(searchMessage.innerHTML)
  
  const text = document.getElementById("text");
  const ilkHarf = text.value.trim().charAt(0).toUpperCase();
  const kalanHarfler = text.value.slice(1).toLowerCase();
  const düzenlenmisSehir = ilkHarf + kalanHarfler;
  generateImg(düzenlenmisSehir);
  getCurrentDateWeather();
  getPreviousDateWeather();
  getNextDateWeather();
  weatherDataList.forEach((data) => {
    details.push(data["feelsLike"]);
    details.push(data["humidity"]);
    details.push(data["speed"]);
    generateTemplate(
      düzenlenmisSehir,
      data["icon"],
      data["temperature"],
      details,
      searchMessage,
      selectedImages
    );
    details = [];
  });
  selectedImages = [];
  weatherDataList = [];
 
});

function generateTemplate(
  capital,
  icon,
  weatherTemperature,
  weatherDetail,
  yazilacakHtmlYeri,
  selectedImages
) {
  console.log("generateTemplate")
  let i = Math.floor(Math.random() * 3);
  const html = `
    <div class="card">
            <div class="card__front">
            <img src="${selectedImages[i].smallImg}" class="card__image"">
                <div class="card__place-name">${capital}</div>
            </div>
            <div class="card__back">
                <h1 class="card__title">${capital}</h1>
                <div class="icon" id="icon">
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></div>
                <div class="temperature" id="temperature"> Sıcaklık =    ${weatherTemperature}</div>
                <div class="description" id="description"></div>
                
                <div class="details" id="details">
                    
                    <p>Detaylar</p>
                    <ul>
                        <li> Hissedilen = ${(weatherDetail[0] / 10).toFixed(
                          2
                        )}</li>
                        <li>Nem         = ${weatherDetail[1]}</li>
                        <li>Rüzgar Hızı = ${weatherDetail[2]}</li>
                     </ul>
                </div>
            
            </div>
        </div>
    `;
  yazilacakHtmlYeri.innerHTML += html;
}

const getWeatherData = async (date) => {
  const apiKey = "bfc8ee9b8b857fa2f5b3c582c66e9c03";
  const cityName = "Ankara";
  const unixTimestamp = Math.floor(date.getTime() / 1000);

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&dt=${unixTimestamp}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Hava durumu verileri alınamadı.");
  }
};

const getCurrentDateWeather = async () => {
  const currentDate = new Date();

  try {
    const data = await getWeatherData(currentDate);
    processWeatherData(data, "Bugün");
  } catch (error) {
    console.log(error);
  }
};

const getPreviousDateWeather = async () => {
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 1);

  try {
    const data = await getWeatherData(previousDate);
    processWeatherData(data, "Dün");
  } catch (error) {
    console.log(error);
  }
};

const getNextDateWeather = async () => {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);

  try {
    const data = await getWeatherData(nextDate);
    processWeatherData(data, "Yarın");
  } catch (error) {
    console.log(error);
  }
};

const generateImg = async (capitalCity) => {
  console.log("generateImg")
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${capitalCity}&client_id=Je0UqxQNYCz-x9R1uVow91Z2O0kCGkyus6cbwacZ3Kk`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const images = data.results;
      selectedImages.length = 0;

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];
        const smallImg = selectedImage.urls.small;
        const bigImg = selectedImage.urls.full;
        const Image = {
          smallImg,
          bigImg,
        };
        selectedImages.push(Image);
      }
    } else {
      throw new Error("No images found.");
    }
  } catch (error) {
    throw new Error("Failed to fetch images.");
  }
};
