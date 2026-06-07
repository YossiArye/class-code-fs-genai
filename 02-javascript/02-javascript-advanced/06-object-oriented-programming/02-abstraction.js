class CoffeeKind {
    #waterLevel = 0
    #temperature = 0


    constructor(coffeeType, milkType, cups) {
        this.coffeeType = coffeeType
        this.milkType = milkType
        this.cups = cups
    }

    #heatWater() {
        this.#temperature = 90
        console.log("Heating water");
    }

    #pourWater(){
        this.#waterLevel -= this.cups
        console.log(`The water level is ${this.#waterLevel} and the temperature is ${this.#temperature}`);
    }

    
    #fillWater(){
        this.#waterLevel = 5
        console.log(`Water filled to level ${this.#waterLevel}`);
    }


    makeCoffee() {
        if(this.#waterLevel < 2){
            this.#fillWater()
        }
        if(this.#temperature < 90){
            this.#heatWater()
        }
        this.#pourWater()
    }
}


const coffee = new CoffeeKind('Capochino', 'regular', 2)
const anotherCoffee = new CoffeeKind('Moka', 'regular', 1)


coffee.makeCoffee()
console.log("======");
coffee.makeCoffee()
console.log("======");
coffee.makeCoffee()