import icons from "../../images/sprite.svg";

class resultView{
    // Private Variebles
    #parentEle=document.querySelector(".search-result");
    #data;
    // Public Methods

    render(data){
        this.#data=data;

        // for (const i of data) {
        //     i.then(el=>{
        //         console.log(el)
        //     }).catch(err=>{console.log(err)})
        // }
        this.#clear();
        const markup=this.#generateMarkUp()
        this.#parentEle.insertAdjacentHTML('afterbegin',markup)
    }

    #clear(){
        // this.#parentEle.innerHTML="";
    }
    #generateMarkUp(){
        return `
            <a href="#${this.#data.woeid}" class="city">
                <div class="city__text">
                    <p class="city__text--1">${this.#data.title}</p>
                    <p class="city__text--2">${this.#data.parent.title}</p>
                </div>
                <svg class="city__icon">
                    <use xlink:href="${icons}#icon-${this.#data.consolidated_weather[0].weather_state_abbr}"></use>
                </svg>
            </a> 
        `
    }

}

export default  new resultView()