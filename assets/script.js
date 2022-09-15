const userAction = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&past_days=7');
    const myJson = await response.json();
    console.log(myJson);
}

userAction();