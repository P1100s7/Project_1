var APIKey = "I9u6_SnBzPfzZMdaFDN4jRPfwr6wYPsJ";
var ticker = "SPY";
var daySpan = 5;

//date ranging for stock market api
var today = new Date().toJSON().slice(0, 10);
var past = new Date();
past.setDate(past.getDate() - daySpan - 1);
var pastDate = past.getFullYear() + '-' + (past.getMonth() + 1).toString().padStart(2, "0") + '-' + past.getDate().toString().padStart(2, "0");

const pullWeather = async () => {
    //pull weather JSON from open meteo
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&past_days=' + daySpan);
    const weatherJson = await response.json();

    //format and return daily high temperature as linear array
    var tempList = [];
    for (i = 0; i <= daySpan; i++) {
        tempList[i] = weatherJson.daily.temperature_2m_max[i];
    }

    return tempList;
}

const pullMarket = async () => {
    //pull closing price from ploygon.io
    const response = await fetch('https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/1/day/' + pastDate + '/' + today + '?adjusted=true&sort=desc&limit=5000&apiKey=' + APIKey);
    const marketJson = await response.json();

    //format and return daily closing price as linear array
    var closeList = [];
    for (i = 0; i < daySpan; i++) {
        closeList[i] = marketJson.results[i].c;
    }

    return closeList;
}


const getDeviation = async (dataSet) => {
    //calculate and return percentage change across dataset as linear array;
    for (i = 0; i < dataSet.length; i++) {
        console.log(i);
        console.log("touch");

    }

}
var temp = pullWeather();
var close = pullMarket();
getDeviation(temp);
getDeviation(close);
//getMarket();
//getWeather();
