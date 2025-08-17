//calcular porcentagem de votos em uma cidade
const prompt =  require('prompt-sync')()

let eleitores = Number(prompt('Quantos eleitores há na cidade?'))
let votosNulos = Number(prompt('Quantos anularam o voto?'))
let votosValidos = Number(prompt('Quantos votos foram válidos?'))
let votosBrancos = Number(prompt('Quantos votos em branco?'))

console.log('O número de votos nulos é',(votosNulos / eleitores) *100)
console.log('O número de votos validos é',(votosValidos / eleitores) *100)
console.log('O número de votosem branco é',(votosBrancos / eleitores) *100)