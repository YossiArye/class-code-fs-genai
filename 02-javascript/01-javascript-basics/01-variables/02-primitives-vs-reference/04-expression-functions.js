//decleration

function father(num1, num2) {
  const sum = num1 + num2
  return function () {
    console.log(`The result is ${sum}`)
  }
}

// const func = function () {
//   console.log(`The result i`)
// }

// func()

const newVar = father(1, 7)

newVar()
