import 'regenerator-runtime/runtime';

import weatherView from "./views/weatherView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
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
        // console.log(data);


        // 3)Render Data
        weatherView.render(data);


    }catch(err){
        // console.log(err)
        weatherView.renderError();
    }
}

const showSearchResult=async function(query=searchView.getQuery()){
    try{
        query=query.toLowerCase();
        // Load Data
        let data=await model.searchCity(query);

        // Render Data
        // console.log(data)
        for (const i of data) {
            i.then(el=>{
                console.log(el)
                resultView.render(el)
            }).catch(err=>{console.log(err)})
        }
        // resultView.render(data);
        
    }catch(err){
        weatherView.renderError();
    }
}


// // ["hashchange","load"].forEach(ev=>window.addEventListener(ev,showWeather));
// window.addEventListener("load",showWeather);
// window.addEventListener("hashchange",showWeather);

// showSearchResult("san");

const init=function(){
    weatherView.addHandlerRender(showWeather);
    searchView.addHandlerSearch(showSearchResult);
    
}

init();


