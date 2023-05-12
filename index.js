const card = document.querySelectorAll(".card");
const cards = document.getElementById("cards");
const searchMessage = document.getElementById("search-result");
// let text = document.getElementById("text");
let form = document.getElementById("form")

const capitalCity = ["Ankara", "Paris", "Tokyo", "Washington"];

function generateTemplate(capital, icon, weatherTemperature, weatherDetail,yazilacakHtmlYeri) {
  const html = `
    <div class="card">
            <div class="card__front">
                <img src="img/${capital}.jpg" alt="" class="card__image">
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
                        <li> Hissedilen = ${weatherDetail[0]}</li>
                        <li>Nem         = ${weatherDetail[0]}</li>
                        <li>Rüzgar Hızı = ${weatherDetail[0]}</li>
                     </ul>
                </div>
            
            </div>
        </div>
    `;
    yazilacakHtmlYeri.innerHTML += html;
}
capitalCityStart(capitalCity);
function capitalCityStart(array) {
  array.forEach((element) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=74d5db86d1bc7b7f9917c66839e50cad&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temparature = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const details = [
          Math.round(data.main.feels_like),
          data.main.humidity,
          data.wind.speed,
        ];
        generateTemplate(element, icon, temparature, details,cards);
      })
      .catch((error) => {
        searchMessage.textContent = "Hava durumu bilgisi alınamadı."; //result.textContent özelliği, içeriğin değiştirilmesi

        // return alert("Lütfen bir ülke ve şehir giriniz")
      });
  });
}


form.addEventListener('submit', function (event){
    event.preventDefault();
    const text = document.getElementById("text");
    event.preventDefault();
    const ilkHarf = text.value.trim().charAt(0).toUpperCase();
    const kalanHarfler = text.value.slice(1).toLowerCase();
    const düzenlenmisSehir = ilkHarf + kalanHarfler;
    console.log(düzenlenmisSehir)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${düzenlenmisSehir}&appid=74d5db86d1bc7b7f9917c66839e50cad&units=metric`;
   
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temparature = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const details = [
          Math.round(data.main.feels_like),
          data.main.humidity,
          data.wind.speed,
        ];
        generateTemplate(düzenlenmisSehir, icon, temparature, details,searchMessage);
      })
      .catch((error) => {
        searchMessage.textContent = "Hava durumu bilgisi alınamadı."; //result.textContent özelliği, içeriğin değiştirilmesi

        // return alert("Lütfen bir ülke ve şehir giriniz")
      });
})





// capitalCityStart(capitalCity);
// async function capitalCityStart(array){
//     capitalCity.forEach((element) => {
//         const searchResult = searchOutput(element);
//      console.log(searchResult)
//     // generateTemplate(element,"15","15","15");
//     });

// }

// async function searchOutput(searchInput) {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=74d5db86d1bc7b7f9917c66839e50cad&units=metric`
//     );
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     errorMessage.textContent = 'Hava durumu bilgisi alınamadı.';
//   }
// }

// function searchOutput(searchInput){

//     let url  =`http://api.weatherapi.com/v1/current.json?key=c820bae4f65047388c1164528231005&q=${searchInput}&aqi=no`;

//     fetch(url)
// 		.then(response => response.json())
// 		.then(data => {
// 			const temparature = Math.round(data.main.temp);
//             const icon = data.weather[0].icon;
//             const details = [Math.round(data.main.feels_like),data.main.humidity,data.wind.speed];
//             console.log(data)

// 		})
// 		.catch(error => {
// 			errorMessage.textContent = 'Hava durumu bilgisi alınamadı.';  //result.textContent özelliği, içeriğin değiştirilmesi
//             console.log(errorMessage)
// 			// return alert("Lütfen bir ülke ve şehir giriniz")
// 		});

// }
