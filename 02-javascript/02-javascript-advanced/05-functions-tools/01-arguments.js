
function superConcatSolomon(){
    console.log(arguments)
    let united = []
    for(const arr of arguments){
        console.log('beforeUnited', united)
        united = [...united, ...arr]
        console.log('arr', arr)
        console.log('united', united)

    }
    return united
    
}

superConcatSolomon([1,2,5], [6,7,"monkey"])
