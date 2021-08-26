
// Get Weather of That City Based On it woeid
import 'regenerator-runtime/runtime';



export const state={
    locationData:[]
}

export const getWeather= async function(id){
    try{
        let res=await fetch(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${id}/`);
        // let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
        let data=await res.json()
        return data;
    }catch(err){
        console.log(err)
    }
    
}


// Search City Based On the Query Input
export const searchCity=async function(query){
    try{
        // let res=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`);
        let res=await fetch(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=${query}`)
        let data=await res.json();
        let allData=[];

        console.log(data)

       let newData=data.map(async function(el){
           let id=el.woeid;
           let newres=await fetch(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${id}/`);
        // let newres=await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
           let newdata=await newres.json()
           return newdata;
        })

        for (const i of data) {
            allData.push(i)
        }

        console.log(allData)
       
        // return newData.map(async el=>{
        //     let data=await el;

        //     return data;
        // });

        return newData;

    }catch(err){
        console.log(err)
    }
}

// Search City Based On the User Geolocation

 const getLocation=function(){
     let cods;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(el=>{
            cods=el.coords;
            return cods;
        });
    } else { 
        return  "Geolocation is not supported by this browser.";
    }
}




export const searchLocation=async function(){
    try{
        let long;
        let lat;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(el=>{
                long=el.coords.longitude;
                lat=el.coords.latitude;
                const api=`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
                fetch(api).then(response=>{
                    return response.json()
                }).then(data=>{state.locationData=data});
            })
        }else{
            console.log("Something wrong")
        }
    }
    catch(err){
        console.log(err)
    }
}

