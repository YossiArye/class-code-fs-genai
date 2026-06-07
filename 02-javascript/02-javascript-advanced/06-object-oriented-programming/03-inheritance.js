class User {
  #password
  static regexRegex = /^[^f]/
  constructor(email, name, password) {
    if (!User.regexRegex.test(email)) {
      throw "Invalid email at all"
    }
    this.email = email
    this.name = name
    this.#password = password
  }

  login() {
    console.log(`${this.name} logged`)
  }
}

class Admin extends User {
  constructor(email, name, password, department) {
    super(email, name, password)
    this.department = department
    this._role = "Product Manager"
  }

  readUser(user) {
    console.log(`${user.name} is a user, and its email is ${user.email}`)
  }

  deleteUser(user) {
    console.log(`${this.name} deleted the user ${user.name}`)
  }
}

const ad = new Admin("p@gmail.com", "adoni", "12qwe3", "logistics")
const ad1 = new Admin("a1@gmail.com", "david", "12dfdefqwe3", "math")

// ad.login()

const kuku = new User("Elazar@cdbjmckbm.com", "Elaz", "gyjegdj6ew6er83")

// kuku.login()

// ad.readUser(kuku)

// ad.deleteUser(kuku)



class SuperAdmin extends Admin {

    constructor(email, name, password) {
        super(email, name, password)
        this._role = 'CTO'
    }


    shutdownSystem(){
        console.log(`${this.name} is shutting down the system`);
    }
}

const superAd = new SuperAdmin('sa@gmail.com', 'Khamenai', 'gone')


console.log(superAd);



const u = new User('u@gmail.com')


console.log(u);


superAd.shutdownSystem()


superAd._role = "Tech Lead"//don't pass CR



