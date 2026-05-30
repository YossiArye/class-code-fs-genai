

const numbers = [1,2,3,4,5,6,7]


const sum = numbers.reduce(
    
    function(prevValue, currentValue) {
        return prevValue + currentValue
    } 

)


console.log(sum);

function superConcatSolomon(arr){
    const arrFavorit = [90, 110, 130]
    const united = arr.reduce(
        (prevValue, currentValue) => [...prevValue, ...currentValue], arrFavorit
    )
    console.log(united);
    
    return united
    
}

superConcatSolomon([[1,2,5], [6,7,"monkey"], [90, 405]])


