const inquirer = require("inquirer");

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

function calculaN(n) {
  let n1 = 1;
  let n2 = 1;

  for (; n >= 0; n--) {
    if (n2) console.log(n2);
    const temp = n1;
    n1 = n1 + n2;
    n2 = temp;
  }
  console.log(n2);
  return n2;
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

  console.log("N: " + n);

  calculaN(n - 2);
}

calculo();
