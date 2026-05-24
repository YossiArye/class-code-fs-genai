const person = {
    name: "Pinni",
    age: 23,
    hasChildren: true,
    login(){
        console.log(this)
    }, 
    delay(){
        setTimeout(() => console.log(this), 4000)
        console.log(this);
        
    }
}


function ann(){
    console.log(this)
}

// person.login()
person.delay()

