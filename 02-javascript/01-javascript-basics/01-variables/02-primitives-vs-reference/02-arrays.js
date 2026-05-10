let a = 10
let b = a


console.log(a)//10
console.log(b)//10

b = b + 12
console.log(a)//10
console.log(b)//22


const arr = ["pizza", 8, "Pinni"]
console.log(arr[2])

arr[2] = "Pinni Mepatpet"
console.log(arr[2])

const arrCopy = arr
console.log(arrCopy)//["pizza", 8, "Pinni Mepatpet"] 

arrCopy.push("Pinni Lo Mepatpet")
console.log(arrCopy)//["pizza", 8, "Pinni Mepatpet", "Pinni Lo Mepatpet"] 
console.log(arr)//["pizza", 8, "Pinni Mepatpet"]