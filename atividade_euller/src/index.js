const express = require('express'); 

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
       
        this.express.get('/health/', (req, res) => {
            res.send({
                status: "OK",
                nome: "Hyago",
                idade: 17, 
                cpf: "24746348863" 
            });
        });
    }
}

module.exports = new AppController().express;


