const basicColors = ["red", "green", "blue"]
const colors = ["pink", "orange", "black"]


const combinedArrays = basicColors.concat(colors)

console.log(combinedArrays)


const combinedArraysES6 = [...basicColors, ...colors]

console.log(combinedArraysES6)


function solomonConcat(arr1, arr2){
    return arr1.concat(arr2)
}


console.log(solomonConcat(basicColors, colors))



const combinedArraysWithAddition = [...basicColors, 'purple', ...colors, 'violet']


console.log(combinedArraysWithAddition)


const chat = {
    llm: 'gpt4omini',
    temperature: 0.1,
    top_p: 0.9
}

const genAI = {
    server: "MCP",
    agent: "Anthropic"
}


const combinedObjects = {
    ...chat, ide: "cursor", ...genAI, language: "Python"
}

console.log(combinedObjects);
