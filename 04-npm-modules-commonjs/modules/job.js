import { Person } from "./person.js"

class Job extends Person {
  constructor(name, age, degree) {
    super(name, age)
    this.degree = degree
  }
}


// function greet(){
//     console.log("Hello World");
    
// }

const greet = "I went yesterday to some where"

export { Job }


export default greet