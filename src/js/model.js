
// Get Weather of That City Based On it woeid
import 'regenerator-runtime/runtime';

export const getWeather= async function(id){
    try{
        // let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/44418`);
        let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
        let data=await res.json()
        return data;
    }catch(err){
        console.log(err)
    }
    
}


// Search City Based On the Query Input
export const searchCity=async function(query){
    try{
        let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`);
        let data=await res.json();
        let allData=[];

       let newData=data.map(async function(el){
           let id=el.woeid;
           let newres=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
           let newdata=await newres.json()
           return newdata;
        })
       
        return newData;

    }catch(err){
        console.log(err)
    }
}

