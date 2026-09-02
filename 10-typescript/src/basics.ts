// let str = 'Hello world'

// str = '90'

let bool = true

// bool = 90


let name : string

// name = 23


let bool1 : boolean


// bool1 = 'klklk'


let id : string | number | boolean

id = true


const arr = [233434, 'Elaz']


// const names = ['Yossi', "Hilli"]

const names : (string | number)[] = []


names.push(90)


let person = {
    name: 'Roei',
    age: 23
}


// person.name = 90


const obj : {name: string, age: number | string} = {
    name: "Yossi",
    age: "34"
}


let greet = (a : any) => {
    return `Hello World ${a}`
}

// let hw = greet()

// hw = 90

greet(true)


function foo(a : number, b: number, c? : string) : number {
    console.log(c);
    return a * b
    
}

foo(2, 3, 'oooo')


let num : unknown

// num[0]
// num()
// num.length
// new num()


let str : unknown= 'str'
num = 23
str = num