let name = "yossi"
let age = 56
let address = "Rakefet 90, TLV"


const person = {
   name : "yossi",
   age : 56,
   address : "Rakefet 90, TLV" 
}

const person1 = {
   name : "danny",
   age : 61,
   address : "Rakefet 60, TLV" 
}


class Person {
    // {
    //     name: ---,
    //     age: ---,
    //     address: ---
    // }
    constructor(name, age, address) {
        this.name = name
        this.age = age
        this.address = address
        //CRIME - PESHA
        // this.log = () => {
        //        console.log(`I'm ${this.name} and I'm ${this.age} years old, and I'm living in ${this.address}`)
        // }
    }

    log(){
        console.log(`I'm ${this.name} and I'm ${this.age} years old, and I'm living in ${this.address}`)
    }
}


const employee = new Person("Yossi", 62, "JLM")
const user = new Person("David", 33, "Azor")

employee.log()
user.log()


// function per2(name, age, address){
//     const obj =  {
//         name,
//         age,
//         address,
//         log(){
//             console.log(`I'm ${name} and I'm ${age} years old, and I'm living in ${address}`)
//         }
//     }
//     return obj
// }

// const pero = per2("Elaz", 31, "BB")


// // pero.log()



// console.log(pero);
console.log(user);

