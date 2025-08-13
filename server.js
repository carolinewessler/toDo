const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect('mongodb+srv://carolwessler:pTpMxrJDQYCDMSdE@cluster0.mje4eku.mongodb.net/tasks?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro de conexão:', err));

// Modelo de tarefa
const Task = mongoose.model('Task', {
  titulo: String,
  status: String
});

// Rotas da API
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { titulo, status } = req.body;
  const task = new Task({ titulo, status });
  await task.save();
  res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(task);
});

// Rodar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
