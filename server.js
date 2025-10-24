import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Rota GET - listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários', detalhes: error.message });
  }
});

// ✅ Rota POST - criar novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // 🔍 Validação rigorosa dos dados
    if (
      !name || typeof name !== 'string' || !name.trim() ||
      !email || typeof email !== 'string' || !email.trim() ||
      typeof age !== 'number' || age < 0 || age > 120
    ) {
      return res.status(400).json({ error: 'Dados inválidos. Verifique nome, idade e e-mail.' });
    }

    const emailNormalizado = email.trim().toLowerCase();

    // 🔎 Verifica se o e-mail já está cadastrado
    const existente = await prisma.user.findUnique({
      where: { email: emailNormalizado }
    });

    if (existente) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    // ✅ Criação do novo usuário
    const novoUsuario = await prisma.user.create({
      data: { name: name.trim(), age, email: emailNormalizado }
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario });
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
  }
});

// ✅ Rota PUT - atualizar usuário existente
app.put('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, email } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const usuario = await prisma.user.findFirst({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o novo e-mail já está em uso por outro usuário
    if (email) {
      const emailNormalizado = email.trim().toLowerCase();
      const emailExistente = await prisma.user.findUnique({ where: { email: emailNormalizado } });
      if (emailExistente && emailExistente.id !== id) {
        return res.status(409).json({ error: 'E-mail já está em uso por outro usuário.' });
      }
    }

    // Atualiza apenas os campos fornecidos
    const dadosAtualizacao = {};
    if (name && typeof name === 'string') dadosAtualizacao.name = name.trim();
    if (typeof age === 'number' && age >= 0 && age <= 120) dadosAtualizacao.age = age;
    if (email && typeof email === 'string') dadosAtualizacao.email = email.trim().toLowerCase();

    const usuarioAtualizado = await prisma.user.update({
      where: { id },
      data: dadosAtualizacao
    });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
  }
});

// ✅ Rota DELETE - remover usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const usuario = await prisma.user.findFirst({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
  }
});

// ✅ Inicialização do servidor
app.listen(3001, () => {
  console.log('🚀 Servidor rodando na porta https://cadastro-api-dr5y.onrender.com/usuarios');

});