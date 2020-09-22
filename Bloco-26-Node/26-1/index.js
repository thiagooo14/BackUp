/* Exercicio 1 : O script deve calcular o IMC de uma pessoa e exibi-lo na tela.
utilizado o script start do npm para executar o arquivo index.js.
 >> Instalado o pacote readline-sync para coletar os dados do usuário.
 > IMC é peso / altura².
*/

const readline = require('readline-sync');

function calculaIMC() {
  const altura = readline.questionFloat("digita a Alutura:");
  const peso = readline.questionFloat("digite o peso:");

  console.log("Peso = %s Altura = %s", altura, peso);

  const result = retornaIMC(peso, altura);

  /*Exercicio 2: mostrar o nivel de obesidade */
  if (result < 18.5) {
    console.log(`o IMC é + ${result}  Abaixo do peso (magreza)`);
  } else if (result >= 18.5 && result <= 24.9) {
    console.log(`o IMC é + ${result} Peso normal`);
  } else if (result >= 25 && result <= 29.9){
    console.log(`o IMC é + ${result} Acima do peso (sobrepeso)`);
  } else if (result >= 30 && result <= 34.9){
    console.log(`o IMC é + ${result} Obesidade grau I`)
  } else if (result >= 35 && result <= 39.9){
    console.log(`o IMC é + ${result} Obesidade grau II`)
  } else if (result <= 40){
    console.log(`o IMC é + ${result} Obesidade graus III e IV`)
  }
}

function retornaIMC(peso, altura) {
  const IMC = (peso / Math.pow(altura, 2)).toFixed(2);
  return IMC;
}

calculaIMC();
