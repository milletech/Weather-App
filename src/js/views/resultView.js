import icons from "../../images/sprite.svg";

class resultView{
    // Private Variebles
    #parentEle=document.querySelector(".search-result");
    #data;
    // Public Methods

    render(data){
        this.#data=data;
        this.#clear();

        for (const i of data) {
            i.then(el=>{
                const markup=this.#generateMarkUp(el)
                this.#parentEle.insertAdjacentHTML("beforeend",markup)
            }).catch(err=>{console.log(err)})
        };

        // this.#data.map(this.#generateMarkUp).join("")
        

    }

    renderSpinner(){
        let markup=`
        <div class="sidespinner">
            <div class="sidespinner__main">
            </div>
            <p class="sidespinner__text">Loading...</p>
        </div> `;

        this.#clear();

        this.#parentEle.insertAdjacentHTML("afterbegin",markup)
    }

    renderError(){
        let markup=`
        <div class="search-error">
            <p>city can't be found!</p>
        </div> 
        `;

        this.#clear();

        this.#parentEle.insertAdjacentHTML("afterbegin",markup)


    }

    #clear(){
        this.#parentEle.innerHTML="";
    }
    #generateMarkUp(el){
        return `
            <a href="#${el.woeid}" class="city">
                <div class="city__text">
                    <p class="city__text--1">${el.title}</p>
                    <p class="city__text--2">${el.parent.title}</p>
                </div>
                <svg class="city__icon">
                    <use xlink:href="${icons}#icon-${el.consolidated_weather[0].weather_state_abbr}"></use>
                </svg>
            </a> 
        `
    }

}

export default  new resultView()