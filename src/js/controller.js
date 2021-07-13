
import 'regenerator-runtime/runtime';

import icons from "../images/sprite.svg";

import weatherView from "../js/views/view.js"
import * as model from "./model.js";


// model.getWeather("44418")



let parentMain=document.querySelector(".main__display");
let parentFoll=document.querySelector(".following");



const showWeather=async function(){
    try{
        const id=window.location.hash.slice(1);

        

        if(!id) return;
        console.log(id)
        
        // 1) Render Spinner
        weatherView.renderSpin()

        // 2) Load Data
        let data=await model.getWeather(id);
        console.log(data);


        // 3)Render Data
        weatherView.render(data);


    }catch(err){
        console.log(err)
    }
}


window.addEventListener("hashchange",showWeather);
window.addEventListener("load",showWeather);
