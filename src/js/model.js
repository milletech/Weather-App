
// Get Weather of That City Based On it woeid
import 'regenerator-runtime/runtime';

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

