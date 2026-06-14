let a = 12
let b = a
b = b + 1
console.log("b", b)//13
console.log("a", a)//12

const obj = {
    name: "Yossi",
    age: 35,
    isSingle: true,
}


// const personAge = obj.age
// console.log(personAge)

// const personName = obj.name
// console.log(personName)

// console.log(obj["isSingle"])

console.log(obj.name)
const blablabla = "name"
console.log(obj.blablabla)
console.log(obj[blablabla])



const obj1 = obj

obj1.address = 'rakefet'
obj1["id"] = '4456764767843'

console.log("obj", obj)
console.log("obj1", obj1)