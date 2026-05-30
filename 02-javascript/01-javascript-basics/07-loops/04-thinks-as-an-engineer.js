function checkPolindrom(arr) {
    for(let i = 0; i < arr.length / 2; i++){
        if(arr[i] !== arr[arr.length - i - 1]){
            return false
        }
    }
    return true
}

console.log(checkPolindrom([11, 12, 3, 4, 3, 12, 11]))
// checkPolindrom([1, 2, 10, 11, 3, 2, 1])
