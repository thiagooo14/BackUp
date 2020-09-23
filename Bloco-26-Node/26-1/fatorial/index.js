const inquirer = require("inquirer");

// Tratamentos para numeros
function isInteger(number) {
  return parseInt(number) === parseFloat(number);
}

// Tratamento de validação para numeros Inteiros
function validaN(value) {
  if (value < 0) {
    return "Informe um número maior ou igual a 0";
  } else if (Number.isNaN(value) || !isInteger(value)) {
    return "Informe um número inteiro";
  }
  return true;
}

// realiza fatoração
function fatoracao(n) {
  if ([0, 1].includes(n)) {
    return 1;
  }
  return n * fatoracao(n - 1);
}

async function calculo() {
  // solicita as informações ao usuário no terminal
  const answers = await inquirer.prompt([
    {
      type: "input",
      validate: validaN,
      name: "n",
      message: "Informe o valor de N:",
    },
  ]);

  // retorna um inteiro informando base 10
  const n = parseInt(answers.n, 10);

  console.log("n: " + n);

  const resultado = fatoracao(n);

  console.log("Resultado: " + resultado);
}

calculo();
