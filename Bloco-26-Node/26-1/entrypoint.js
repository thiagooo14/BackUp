/* Exercicio 3 : modifique o script d index.js para que ele utilize o pacote inquirer para
  solicitar as informações ao usuário no terminal. Utilize a propriedade validate das perguntas
  do inquirer para verificar se os valores digitados são números válidos.
 >> Instalado o pacote inquirer para coletar os dados do usuário.
 > IMC é peso / altura².
*/
// resposta https://github.com/tamagoshii/Trybe-Course/blob/master/Exercicios/26_1/calcula-imc/entrypoint.js
// importando pacote inquirer
const inquirer = require("inquirer");

// Tratamento de validação para numeros decimais
function validaFloat(input) {
  return !isNaN(parseFloat(input)) || 'Por favor, digite um número válido'; 
}

// Revendo funções Assincronas
async function calculaIMC() {
  const answars = await inquirer.prompt([{
    name: 'peso',
    type: 'input',
    message: 'Qual o seu Peso: ',
    validate: validaFloat
  }, {
    name: 'altura',
    type: 'input',
    message: 'Qual a sua Altura: ',
    validate: validaFloat
  }]);
  
  const peso = parseFloat(answars.peso);
  const altura = parseFloat(answars.altura);

  console.log("Peso: = %s Altura: = %s ", peso, altura);

  const result = retornaIMC(peso, altura);

  if(result < 18.5) {
    console.log("Resultado: " + result + " Abaixo do peso (magreza)");
  } else
  if(result >= 18.5 && result <= 24.9){
    console.log("Resultado: " + result + " Peso normal");
  } else
  if(result >= 25.0 && result <= 29.9){
    console.log("Resultado: " + result + " Acima do peso (sobrepeso)");
  } else
  if(result >= 30.0 && result <= 34.9){
    console.log("Resultado: " + result + " Obesidade grau I");
  } else
  if(result >= 35.0 && result <= 39.9){
    console.log("Resultado: " + result + " Obesidade grau II");
  } else
  if(result > 40.0){
    console.log("Resultado: " + result + " Obesidade graus III e IV");
  }
}

function retornaIMC(peso, altura) {
  const imc = (peso / Math.pow(altura, 2)).toFixed(2);
  return imc;
}

calculaIMC();