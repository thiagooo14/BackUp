const express = require('express');
​
const app = express();
​
const port = 3333;
​
const validMiddleWare = (req, res, next) => {
  const { operacao, numero1, numero2 } = req.params;
​
  const operacoes = ['soma', 'subtração', 'divisão', 'multiplicação'];
​
  if (!operacoes.includes(operacao)) {
    return res.status(404).send(`operação não encontrada. 
    As operações válidas são: soma, subtração, divisão e multiplicação.
​
    tente outra vez:
    http://localhost:${port}/operacao/numero1/numero2`);
  } else if (isNaN(numero1)) {
    return res.status(404).send(`numero1 inválido
    
    tente outra vez:
    http://localhost:${port}/operacao/numero1/numero2`);
  } else if (isNaN(numero2)) {
    return res.status(404).send(`numero2 inválido
    
    tente outra vez:
    http://localhost:${port}/operacao/numero1/numero2`);
  } else {
    res.status(200);
    return next();
  }
};
​
app.get(
  '/:operacao/:numero1/:numero2',
  validMiddleWare,
  (req, res, next) => {
    const { operacao, numero1, numero2 } = req.params;
​
    if (operacao !== 'soma') return next();
​
    const result = Number(numero1) + Number(numero2);
​
    res.send(String(result));
  },
  (req, res, next) => {
    const { operacao, numero1, numero2 } = req.params;
​
    if (operacao !== 'subtração') return next();
​
    const result = Number(numero1) - Number(numero2);
​
    return res.send(String(result));
  },
  (req, res, next) => {
    const { operacao, numero1, numero2 } = req.params;
​
    if (operacao !== 'divisão') return next();
​
    const result = (Number(numero1) / Number(numero2)).toFixed(2);
​
    return res.send(result);
  },
  (req, res, next) => {
    const { operacao, numero1, numero2 } = req.params;
​
    if (operacao !== 'multiplicação') return;
​
    const result = Number(numero1) * Number(numero2);
​
    return res.send(String(result));
  },
);
​
app.listen(port, () => {
  console.log(`atividade5 listening at http://localhost:${port}`);
});
