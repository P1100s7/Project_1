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
    //wait for async data from API call
    const data = await dataSet;

    //calculate deviation as a percentage
    var deviation = [];
    for (i = 0; i < data.length; i++) {
        deviation[i] = (data[i]-data[i-1])/data[i];
    }
    console.log("deviation: " + deviation);
    return deviation;
}

const getTradeFactor = async () => {

    const tempFactor = await getDeviation(pullWeather());
    const closeFactor = await getDeviation(pullMarket());
    console.log(tempFactor);
    console.log(closeFactor);
     var tradeDivisor = []
     var tradeFactor = 0;
    for (i = 1; i < daySpan; i++) {
        tradeDivisor[i-1] = closeFactor[i]/tempFactor[i];
        tradeFactor += tradeDivisor[i];
        console.log(tradeFactor);
    }
}

getTradeFactor();


