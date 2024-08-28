const express = require("express"); // importando o módulo express

class AppController {

  constructor() {
    this.express = express(); 
    this.middlewares(); 
    this.routes(); 
  }
  middlewares() {
    this.express.use(express.json());
  }

  routes() {
   

    const users = [];
    const auth = [];   

    this.express.post("/users", (req, res) => {
      const {id,nome,email,senha} = req.body; // pede 'id, nome, email' no body
      users.push({ id,nome,email,senha }); // inserindo 'id, nome, email' na array 'users'
      res.status(200).send({ message: "usuario cadastrado com sucesso" }); // retorna 'status: ok' e "usuario cadastrado com sucesso"
    });

    this.express.post("/auth", (req, res) => {
      const { email, senha } = req.body; 
      const useremail = users.find((useremail) => useremail.email == email);
      if(useremail){
        const usersenha = users.find((usersenha) => usersenha.senha == senha);
        if(usersenha){
            res.status(200).send({message: "autenticação bem sucedida"})
        }
        else{
            res.status(400).send({message: "usuário não encontrado"})
        }
      }
      else{
        res.status(400).send({ message: "usuário não encontrado" });
      }
    });


    this.express.get("/users/:id", (req,res) => {
      const { id } = req.params;

      const user = users.find((user) => user.id == id);

      console.log(user);

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send({ message: "usuário não encontrado" });
      }
    });

    this.express.get("/health/", (req, res) => {
   
      res.send({
        nome: "hyago",
        idade: "17",
        CPF: "24746348863",
      });
    });
  }
}


module.exports = new AppController().express;