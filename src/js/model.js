
// Get Weather of That City Based On it woeid


export const getWeather= async function(id){


    try{
        let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}`);
        let data=await res.json()
    
        // let abbr=data.consolidated_weather[0].weather_state_abbr;
        // let image=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/static/img/weather/png/${abbr}.png`);
        // let dataImg=await image.json();
        return data;
    }catch(err){
        console.log(err)
    }
    
}

