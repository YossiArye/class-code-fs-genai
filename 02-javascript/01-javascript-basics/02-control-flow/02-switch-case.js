//10,000 -> 25%
//20,000 -> 30%
//25,000 -> 35%
//30,000 -> 40%


function calcNet(salary){
    let tax = 0
    switch (true) {
        case salary >= 10000 && salary < 20000:
            tax = 0.25
            break;
        case salary >= 20000 && salary < 25000:
            tax = 0.30
            break;
        case salary >= 25000 && salary < 30000:
            tax = 0.35
            break;
        case salary >= 30000:
            tax = 0.40
            break;
        default:
            tax = 0.01
            break;
    }
    return salary * (1 - tax)
}


function calcNet1(salary){
    let tax = 0
    switch (true) {
        case salary >= 30000:
            tax = 0.40
            break
        case salary >= 25000:
            tax = 0.35
            break
        case salary >= 20000:
            tax = 0.30
            break
        case salary >= 10000:
            tax = 0.25
            break;
        default:
            tax = 0.01
            break;
    }
    return salary * (1 - tax)
}

const net = calcNet(100)
console.log(net)//





function test(){
    console.log("qqqqqqq")
    return
    console.log("kkkkkkk")
}
