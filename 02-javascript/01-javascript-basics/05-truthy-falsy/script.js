//undefined
let a
// console.log(a)

//null
let b = 90
b = null
// console.log(b)

//0
let c = 0

//""
let d = ""


//false
let e = false


//NaN
let f = 10 + a//a = undefined
console.log(f)

if (f) {
    console.log("I'm truthy, that's why this line will be printed")
} else {
    console.log("I'm falsy, that's why this line will be printed")
}


// let g = 10
// console.log(g + undefined)

// console.log(typeof (g + undefined))