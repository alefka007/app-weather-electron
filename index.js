const searchInput = document.querySelector('.search-input');
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const time = document.querySelector('.time');

let city = 'Voronezh';

setInterval(() => {
    const date = new Date;
    time.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ?
        '0' + date.getSeconds() : date.getSeconds()}`;
}, 1000);

document.addEventListener('keydown', (event) => {
        if(event.key ==='Enter') {
            let value = searchInput.value;
            if(!value) return false;
            city = value;
            init()
            searchInput.value = '';
        }

})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1d257a37b7b4fecedee0340b33d989d`)
    .then(response => {return response.json()})
    .then(data => {
        temp.textContent = `${getCelsium()}°`

        cityName.textContent = data.name;

        function getCelsium() {
            const myTemp = data.main.temp;
            const tempCel = Math.round(myTemp) - 273;

            return tempCel
        }
    })
    .catch(() => {
        alert('Такой город не найден');
        city = 'Voronezh';
        searchInput.value = ''

    })
}

init()

setInterval(() => {
    init()
}, 10000)