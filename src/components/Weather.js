import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather = () => {
    const [isWeather,setIsWeather] = useState({});
    const [isTemp, setIsTemp] = useState(0);
    const [isgrade, setIsgrade] = useState(true);
   

    const succes =(pos)=>{
        const loc = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&appid=d3d1c3cd5017c4e78e51442055538978`)
        .then(res  => {
            setIsWeather(res.data);
            setIsTemp( (res.data.main?.temp-(273.15)).toFixed(2));
            console.log(res.data);
        });
    }
    //Hacemos la peticion de succes solo una vez
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(succes);
    },[]);
    
    const convertGrad=()=>{
        if(isgrade){
            const far = (isWeather.main?.temp-273.15)*(9/5) + 32; 
            setIsTemp(far.toFixed(2));
            setIsgrade(false);
        }else{
            const cGrad=(isWeather.main?.temp)-(273.15);
            setIsTemp(cGrad.toFixed(2));
            setIsgrade(true);
        }
    }
    let urlimg = isWeather?.weather?.[0]?.icon;
    
    return (
        <div className='Weather'>
            <h3>{isWeather.sys?.country}, {isWeather.name}</h3>
            <b>{isWeather.weather?.[0].description}</b>
            <div className='TimeDes'>
                <img src={urlimg === "undefined"? "":`http://openweathermap.org/img/wn/${urlimg}@2x.png`} alt="Weather Icon" />
                <ul>
                    <li>
                        <b>Humidity: </b> 
                        {isWeather.main?.humidity}%
                    </li>
                    <li>
                        <b>Temp mín: </b>
                        {(isWeather.main?.temp_min-(273.15)).toFixed(2)} C°
                    </li>
                    <li>
                        <b>Temp máx: </b>
                        {(isWeather.main?.temp_max-(273.15)).toFixed(2)}C°
                    </li>
                </ul>
            </div>
            <h4>
                <i className="fas fa-temperature-low"></i>
                {isTemp} {isgrade? 'C°':'F°'} 
            </h4>
            <button onClick={convertGrad}> <b>{isgrade? 'F°':'C°'}</b></button>
        </div>
    );
};

export default Weather;