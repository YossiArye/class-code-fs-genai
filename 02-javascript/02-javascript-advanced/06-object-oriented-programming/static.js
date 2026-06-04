class CoffeeKind {
    static waterLevel = 0
    static temperature = 0


    constructor(coffeeType, milkType, cups) {
        this.coffeeType = coffeeType
        this.milkType = milkType
        this.cups = cups
    }

    #heatWater() {
        CoffeeKind.temperature = 90
        console.log("Heating water");
    }

    #pourWater(){
        CoffeeKind.waterLevel -= this.cups
        console.log(`The water level is ${CoffeeKind.waterLevel} and the temperature is ${CoffeeKind.temperature}`);
    }

    
    #fillWater(){
        CoffeeKind.waterLevel = 5
        console.log(`Water filled to level ${CoffeeKind.waterLevel}`);
    }


    makeCoffee() {
        if(CoffeeKind.waterLevel < 2){
            this.#fillWater()
        }
        if(CoffeeKind.temperature < 90){
            this.#heatWater()
        }
        this.#pourWater()
    }
}


const coffee = new CoffeeKind('Capochino', 'regular', 2)
const anotherCoffee = new CoffeeKind('Moka', 'regular', 1)


coffee.makeCoffee()
console.log("======");
anotherCoffee.makeCoffee()
console.log("======");
coffee.makeCoffee()


coffee.temperature = 12

console.log(CoffeeKind.temperature);


console.log(coffee);


