const pullWeather = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&past_days=5');
    const weatherJson = await response.json();
 //   console.log(weatherJson);
    return weatherJson;
}

const pullMarket = async () => {
    const response = await fetch('https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/2022-09-08/2022-09-15?adjusted=true&sort=desc&limit=5000&apiKey=I9u6_SnBzPfzZMdaFDN4jRPfwr6wYPsJ');
    const marketJson = await response.json();
  //  console.log(marketJson);
    return marketJson;
}


const getMarket = async () => {
    var rawMarket = pullMarket();
    //console.log(rawMarket);
    console.log(rawMarket);

}

const getWeather = async () => {
    var rawWeather = pullWeather();
    console.log(rawWeather);

}

getMarket();
getWeather();
