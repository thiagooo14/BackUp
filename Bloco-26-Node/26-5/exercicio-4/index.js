const users = [
  {
    id: 2,
    user: 'antonio',
    comments: ["Hoje o dia está maneiro!", "Agora não está muito"]
  },
  {
    id: 3,
    user: "rodrigo",
    comments: ["To aqui também", "Agora não tô"]
  }
]
​
const express = require('express');
​
const app = express();
​
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
​
  const verifyName = users.find(({ user }) => user === name );
​
  if (!verifyName) return res.status(500).json({ message: "user not found.."});
​
  res.status(200).json({ comments: verifyName.comments });
});
​
app.listen(3000, () => console.log("Comentários do usuarío") );
