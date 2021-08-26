import icons from "../../images/sprite.svg";


class WeatherView{
    // Private Variebles

    #parentMain=document.querySelector(".main__display");
    #parentFoll=document.querySelector(".following");
    #data;




    // Public Methods

        /*Render The UI*/
        render(data){
            this.#data=data;
            const markupMain=this.#generateMarkUp();
            let month=["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            this.#clear();
            this.#parentMain.insertAdjacentHTML("afterbegin",markupMain);


            for(let i=1;i<(this.#data.consolidated_weather.length-1);i++){
                let dayData=this.#data.consolidated_weather[i];
                let dayDate=(this.#data.consolidated_weather[i].applicable_date).slice(8,11);
                let dayYear=(this.#data.consolidated_weather[i].applicable_date).slice(0,4);
                let dayMonth=parseInt((this.#data.consolidated_weather[i].applicable_date).slice(6,7));
                let fullDate=`${dayDate} ${month[dayMonth-1]} ${dayYear}`

                // console.log(fullDate)


                this.#data.consolidated_weather[i].applicable_date=fullDate;

                if(i==1){
                    this.#data.consolidated_weather[i].applicable_date="TOMORROW";
                }
                const markupFoll=this.#generateMarkFoll(dayData);
                this.#parentFoll.insertAdjacentHTML("beforeend",markupFoll);
            }
        }
        /*Handler Function */

        addHandlerRender(handler){
            ["hashchange","load"].forEach(ev=>window.addEventListener(ev,handler));
        }


        /*Render The Error Message*/

        renderError(){
            const markup=`
            <div class="error">
                <p class="error__text">
                    <svg class="error__icon">
                        <use xlink:href="${icons}#icon-error_outline"></use>
                    </svg>Oops! weather can't be loaded :( , look for another city 
                </p>
            </div>
            `
            this.#clear();
            this.#parentMain.insertAdjacentHTML("afterbegin",markup);

        }


        /*Render The Spinner*/

        renderSpin(){
            const markup= `
            <div class="spinner">
                <div class="spinner__main">
                </div>
                <p class="spinner__text">Loading...</p>
            </div>
            `
            this.#clear();

            this.#parentMain.insertAdjacentHTML("afterbegin",markup);

        }


    // Private Methods
    #clear(){
        this.#parentMain.innerHTML="";
        this.#parentFoll.innerHTML="";
    }
    #generateMarkUp(){
        let todayWeather=this.#data.consolidated_weather[0];
        return `
        <div class="today"  id="${this.#data.woeid}">
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
                <p>Today's Weather : ${todayWeather.weather_state_name}</p>

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
                <p class="place__first"><span class="city">${this.#data.title}</span>,<span class="province">${this.#data.parent.title}</span></p>
                <p class="place__second"><span class='country'>${this.#data.parent.title}</span></p>
            </div>

            <svg class="bottom__icon">
                <use xlink:href="${icons}#icon-Bookmark-save"></use>
            </svg>
        </div>
    </div>`
    };

    #generateMarkFoll(daydata){
        
        return `
            <div class="day">
                <p class="day__date">${daydata.applicable_date}</p>
                <div class="day__main">
                    <svg class="day__main--icon">
                        <use xlink:href="${icons}#icon-${daydata.weather_state_abbr}"></use>
                    </svg>
                    <p class="day__main--text">${daydata.weather_state_name}</p>
                </div>
                
                <div class="maxmin">
                    <p class="max-temp">${Math.round(daydata.max_temp)}
                        <svg class="max-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                    <p class="min-temp">${Math.round(daydata.min_temp)}
                        <svg class="min-temp__icon">
                            <use xlink:href="${icons}#icon-degrees-celcius"></use>
                        </svg>
                    </p>
                </div>
            </div>
        `      
    }

}

export default new WeatherView()