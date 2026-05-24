function log(){
    console.log("I'm running after 3 sec")
}


setTimeout(log, 3000)
setTimeout(function(){
    console.log("I'm annon func")
}, 3000)