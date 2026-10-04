# Homework — TypeScript Basics

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/10-typescript

---

## Exercise 1 — Movie catalog types
**Type:** Write

Create the following, in order:

1. A type alias called `Rating` that can be either a `number` or a `string`.
2. A type alias called `Movie` with two properties: `title` (`string`) and `score` (`Rating`).
3. A constant `movie1` of type `Movie`, assigned a valid object.
4. A constant `tags` with type `(string | number)[]`, starting as an empty array. Then push one string value and one number value into it.

```ts
// your code here
```

---

## Exercise 2 — Spot the errors
**Type:** Predict

Below is a block of TypeScript. Three of the six marked lines will **not** compile. Write down which lines (A–F) fail, and explain why each one fails.

```ts
let quantity: number
quantity = "5"                       // A

let flag: boolean
flag = true                          // B

let code: string | number
code = 42                            // C
code = true                          // D

const list: (string | number)[] = []
list.push("apple")                   // E
list.push(true)                      // F
```

---

## Exercise 3 — Fix the bug
**Type:** Fix

This code has three type mistakes: one in the function call's arguments, and two in the `config` object below it. Find and fix all three so the file compiles.

```ts
function calculateTotal(price: number, qty: number, discount?: string): number {
    console.log(discount)
    return price * qty
}

calculateTotal(10, "5", true)


const config: { name: string, active: boolean } = {
    name: "Store",
    active: "yes"
}
```

---

## Exercise 4 — Fill in the blanks
**Type:** Fill

Complete the code below so that:
- The two `interface Animal` declarations merge together (declaration merging), giving `Animal` a `name: string` and a `sound: string`.
- The `Dog` class correctly implements `Animal`.
- The constructor assigns both fields from its parameters.

```ts
interface Animal {
    name: // ???
}

interface Animal {
    sound: // ???
}

class Dog implements // ??? {
    name: // ???
    sound: // ???

    constructor(name: // ???, sound: // ???) {
        this.name = // ???
        this.sound = // ???
    }
}
```

---

## Exercise 5 — Order status
**Type:** Write

1. Create a type alias `OrderStatus` that can only ever be one of the string literals `'pending'`, `'shipped'`, or `'delivered'`.
2. Declare a variable `order1` of type `OrderStatus` and assign it a valid value.
3. Write a function `printStatus` that takes one parameter of type `OrderStatus` and returns a string built with a template literal, e.g. `` `Order is currently: ${status}` ``.
4. Call `printStatus` with `order1`.

```ts
// your code here
```
