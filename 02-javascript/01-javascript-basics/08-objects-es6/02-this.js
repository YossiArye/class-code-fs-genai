let catVoice = "Miaow"
let dogVoice = "Woof"
let birdVoice = "Peet peet"



const animalsVoice1 = {
    catVoice: "JE",
    dogVoice: "MK",
    birdVoice: "PINI",
    hjbvdjkfvrdwhgjfvdghjvb: function (){
        console.log(this)
    }
}

const animalsVoice = {
    catVoice,
    dogVoice,
    birdVoice,
    login: function (){
        console.log(this)
    }
}

// console.log(animalsVoice);



// animalsVoice1.login()

animalsVoice.login()


const login = animalsVoice.login

login()

const anotherLogin = animalsVoice.login.bind(animalsVoice1)

anotherLogin()



























