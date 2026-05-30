const colors = ["red", "green", "blue"]

const r = colors[0]
const g = colors[1]
const b = colors[2]

console.log(r,g,b)

const [r1, g1, b1] = colors

console.log(r1, g1, b1)

const person = {
    name: "Pinni",
    gender: "Male"
}


const name = person["name"]
const gender = person.gender

console.log(name, gender);


const { gender : newGender, name: newName} = person


console.log(newName, newGender)

