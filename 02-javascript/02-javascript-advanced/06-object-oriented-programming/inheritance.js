class User {
    #password
    constructor(email, name, password) {
        this.email = email
        this.name = name
        this.#password = password
    }

    login(){
        console.log(`${this.name} logged`); 
    }
}


class Admin extends User {
    constructor(email, name, password, department) {
        super(email, name, password)
        this.department = department
    }
}


const ad = new Admin("a@gmail.com", "adoni", "12qwe3", "logistics")


ad.login()

console.log(ad);

ad.password = "dsnnejkn"

console.log(ad);
