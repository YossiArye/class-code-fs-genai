// const numbers = [1, 2, 3, 4]

// const [one, two, ...rest] = numbers


// console.log(one, two, rest)


function f(a, ...rest){
    console.log(a, rest)
    let sum = 0
    for(const num of rest){
        sum = sum + num
    }
    return sum
}


console.log(f(1, 2, 3, 4))

