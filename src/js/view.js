
const mille="He makes more than R100 000 per month he is rich";

class Person{
    #greeting="Hi"
    constructor(name){
        this.name=name;
    }
    fullname(){
        console.log(`${this.#greeting} ${this.name}`)
    }
}


const sphe=new Person("Mille");

sphe.fullname()

export default mille;