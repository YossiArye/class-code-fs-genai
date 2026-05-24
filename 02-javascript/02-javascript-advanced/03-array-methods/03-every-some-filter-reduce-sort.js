const people = [
    { id: 1, name: "Shimi", isSingle: true},
    { id: 2, name: "Danny", isSingle: true},
    { id: 3, name: "Gabbyi", isSingle: false},
]

const areAllSingles = people.every(obj => obj.isSingle)
// const areAllSingles = people.every(function(obj){ return obj.isSingle})
const areThereSingles = people.some(obj => obj.isSingle)
const areThereShimi = people.some(obj => obj.name === "Shimi")

console.log(areAllSingles);
console.log(areThereSingles);
console.log(areThereShimi);


const numbers = [1,2,3]

console.log(numbers.some(num => num === 3));
console.log(numbers.some(function(num){ return num === 3}));


const singles = people.filter(obj => !obj.isSingle)

console.log(singles);
console.log(people);


const hasY = people.find(obj => 
    obj.name.includes('y')
)

console.log(hasY)