require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = process.env.PORT || 3001;

async function main() {
  const app = express();
  try {
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.text());

    // Adicionar rota para exibir o ano atual
    app.get("/", (req, res) => {
      const currentYear = new Date().getFullYear();
      res.render("home", { currentYear });
    });

    // Adicionar outras rotas
    app.get("/mydiscord", function (req, res) {
      res.redirect("https://discordapp.com/users/816775306115285073");
    });
    app.get('/assets/css/:nome', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'assets', 'css', req.params.nome));
  });
  
  app.get('/assets/bootstrap/:nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'bootstrap', req.params.nome));
  });
  
  app.get('/assets/fonts/:nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'fonts', req.params.nome));
  });
  
  app.get('/assets/js/:nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'js', req.params.nome));
  });
  app.get('/assets/img/:nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'img', req.params.nome));
  });
  app.get('/assets/fonts/:nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'fonts', req.params.nome));
  });

    // Adicionar outros middlewares

    // Adicionar middleware para tratar erros 404
    app.use((req, res) => {
      res.status(404).render('error', { error: { message: 'Página não encontrada' } });
    });

    // Adicionar middleware de tratamento de erros gerais
app.use((error: any, req: any, res: any, next: any) => {
  // Configura a resposta com o status de erro e a mensagem de erro personalizada
  res.status(error.status || 500);
  res.render('error', { error });
});

app.listen(PORT, () => console.log('Website Started, Listening on Port:', PORT));
} catch (err) {
  console.log(err);
  }
  }
  
  main();