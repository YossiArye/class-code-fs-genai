const arr = ["I", "am", "a", "teacher", 23, true, undefined]

// for(let i = 0; i < arr.length; i++){
//     console.log(arr[i])
// }

for(const i in arr){
    if(arr[i] === "teacher"){
        continue
    }
    console.log(i, arr[i])
}


const person = {
  name: "Shirli",
  age: 62,
  gender: "Male",
}

for(const i in person){
    console.log(i, person[i])
}