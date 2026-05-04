let a = 10

if(true){
    a = 5
    console.log(a)
}

console.log(a)


if(true){
    let b = 12
    console.log(b)
}
console.log(b)//error


if(true){
    const e = 12
    console.log(e)
}
console.log(e)//error


const w = 11
if(true){
    const w = 12
    console.log(w)
}
console.log(w)//11

