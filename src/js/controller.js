import 'regenerator-runtime/runtime';

import weatherView from "./views/weatherView.js"
import * as model from "./model.js";


// model.getWeather("44418")



let parentMain=document.querySelector(".main__display");
let parentFoll=document.querySelector(".following");



const showWeather=async function(){
    try{
        const id=window.location.hash.slice(1);

        if(!id) return;

        // 1) Render Spinner
        weatherView.renderSpin()

        // 2) Load Data
        let data=await model.getWeather(id);
        console.log(data);


        // 3)Render Data
        weatherView.render(data);


    }catch(err){
        // console.log(err)
        weatherView.renderError();
    }
}

const showSearchResult=async function(query){
    try{
        query=query.toLowerCase();
        // console.log(query)
        let data=await model.searchCity(query);
        console.log(data);
    }catch(err){
        weatherView.renderError();
    }
}


// // ["hashchange","load"].forEach(ev=>window.addEventListener(ev,showWeather));
// window.addEventListener("load",showWeather);
// window.addEventListener("hashchange",showWeather);


const init=function(){
    weatherView.addHandlerRender(showWeather);
}

init();


