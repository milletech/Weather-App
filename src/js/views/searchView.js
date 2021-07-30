


class SearchView{
    #search=document.querySelector(".searchform");
    
    getQuery(){
        let query=document.querySelector(".searchInput").value
        return query;
    }
    addHandlerSearch(handler){
        this.#search.addEventListener("submit",function(e){
            e.preventDefault();
            handler()
        });
    }
}

export default new SearchView();