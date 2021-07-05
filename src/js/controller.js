
import 'regenerator-runtime/runtime';

import icons from "../images/sprite.svg";

import * as model from "./model.js";


// model.getWeather("44418")



let parentMain=document.querySelector(".main__display");
let parentFoll=document.querySelector(".following");



const showWeather=async function(){
    try{
        const id=window.location.hash.slice(1);

        

        if(!id) return;
        console.log(id)

        // 1) Load Data
        let data=await model.getWeather(id);
        let todayWeather=data.consolidated_weather[0];


        console.log(data);
        // console.log(todayWeather)

        

        // 2)Render Data
        parentMain.innerHTML="";
        parentFoll.innerHTML="";
        

        let markupMain=`
        <div class="today"  id="${data.woeid}">
            <div class="today__max">
                <svg class="today__max--icon">
                    <use xlink:href="${icons}#icon-${todayWeather.weather_state_abbr}"></use>
                </svg>
                <div class="today__max--main">
                    <p class="max-temp">${Math.round(todayWeather.max_temp)}
                        <svg class="max-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                    <p class="min-temp">${Math.round(todayWeather.min_temp)}
                        <svg class="min-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                </div>
            </div>
            <div class="today__more">
                <p>it is ${todayWeather.weather_state_name} today with:</p>

                <div class="extra">
                    <div class="extra__text">
                        <svg class="extra__icon">
                            <use xlink:href="${icons}#icon-windmill"></use>
                        </svg>

                        <p class="extra__text--main">
                            <span>${Math.round(todayWeather.wind_speed)}</span>Km/h
                            <span>${todayWeather.wind_direction_compass}</span>
                        </p>

                    </div>


                    <div class="extra__text">
                        <svg class="extra__icon">
                            <use xlink:href="${icons}#icon-rain-drops"></use>
                        </svg>

                        <p class="extra__text--main">
                            <span>${todayWeather.humidity}</span>%
                        </p>

                    </div>
                </div>
            </div>
        </div>
            
            <div class="bottom">
                <div class="place">
                    <p class="place__first"><span class="city">${data.title}</span>,<span class="province">${data.parent.title}</span></p>
                    <p class="place__second"><span class='country'>${data.parent.title}</span></p>
                </div>

                <svg class="bottom__icon">
                    <use xlink:href="${icons}#icon-Bookmark-save"></use>
                </svg>
            </div>
        </div>`




        parentMain.insertAdjacentHTML("afterbegin",markupMain);


        for(let i=1;i<(data.consolidated_weather.length-1);i++){

            let dayData=data.consolidated_weather[i];

            let markupFoll=`
            <div class="day">
                <p class="day__date">${dayData.applicable_date}</p>
                <div class="day__main">
                    <svg class="day__main--icon">
                        <use xlink:href="${icons}#icon-${dayData.weather_state_abbr}"></use>
                    </svg>
                    <p class="day__main--text">${dayData.weather_state_name}</p>
                </div>
                
                <div class="maxmin">
                    <p class="max-temp">${Math.round(dayData.max_temp)}
                        <svg class="max-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                    <p class="min-temp">${Math.round(dayData.min_temp)}
                        <svg class="min-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                </div>
            </div>`

            parentFoll.insertAdjacentHTML("beforeend",markupFoll)
            
        }





    }catch(err){
        console.log(err)
    }
}


window.addEventListener("hashchange",showWeather);
window.addEventListener("load",showWeather);
