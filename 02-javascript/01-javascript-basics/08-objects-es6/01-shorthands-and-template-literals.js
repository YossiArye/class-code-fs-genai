let catVoice = "Miaow"
let dogVoice = "Woof"
let birdVoice = "Peet peet"

let songName = "Halleluja"
let song = "The cat sings " + songName
let modernSong = `The cat sings ${songName} and the bird sings ${birdVoice}`

console.log(modernSong);






const animalsVoice1 = {
    catVoice,
    dogVoice,
    birdVoice,
    log: function (){
        console.log("This is an obj about animals voices",  song)
    }
}



const animalsVoice = {
    catVoice,
    dogVoice,
    birdVoice,
    log(){
        console.log("This is an obj about animals voices",  song)
    }
}

// console.log(animalsVoice.log())


