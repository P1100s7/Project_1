var APIKey = "I9u6_SnBzPfzZMdaFDN4jRPfwr6wYPsJ";
var ticker = "SPY";
var daySpan = 5;

//date ranging for stock market api
var today = new Date().toJSON().slice(0, 10);
var past = new Date();
past.setDate(past.getDate() - daySpan - 1);
var pastDate = past.getFullYear() + '-' + (past.getMonth() + 1).toString().padStart(2, "0") + '-' + past.getDate().toString().padStart(2, "0");
//pastDate.slice(0, 10);
console.log(pastDate);
console.log(today);

const pullWeather = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&past_days=' + daySpan);
    const weatherJson = await response.json();
    console.log(weatherJson);

    var tempList = [];
    for (i = 0; i <= daySpan; i++) {
        tempList[i] = weatherJson.daily.temperature_2m_max[i];
    }
    console.log(tempList);
    //console.log(weatherJson.daily.temperature_2m_max[0]);
    return weatherJson;
}

console.log('https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/1/day/2022-09-08/' + today + '?adjusted=true&sort=desc&limit=5000&apiKey=' + APIKey)

const pullMarket = async () => {
    //const response = await fetch('https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/1/day/2022-09-08/2022-09-16?adjusted=true&sort=desc&limit=5000&apiKey=' + APIKey);

    const response = await fetch('https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/1/day/' + pastDate + '/' + today + '?adjusted=true&sort=desc&limit=5000&apiKey=' + APIKey);

    const marketJson = await response.json();

    var closeList = [];
    for (i = 0; i <= daySpan -1; i++) {
        closeList[i] = marketJson.results[i].c;
    }

    console.log(marketJson);
    console.log(closeList);
    return marketJson;
}


const getMarket = async () => {
    var rawMarket = pullMarket();
    //console.log(rawMarket);
    //var data = JSON.parse(rawMarket);
    //console.log(rawMarket.results);

}

const getWeather = async () => {
    var rawWeather = pullWeather();
    //console.log(rawWeather);

}

getMarket();
getWeather();
