var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/nome/:name", function (req, res) {
    usuarioController.nome(req, res);
});

router.post("/finalizar/:idUsuario", function (req, res) {
    usuarioController.finalizar(req, res);
});

router.post('/fazerQuestionario/:idUsuario/:fezQuestionario', function (req, res) {
    usuarioController.fazerQuestionario(req, res);
});
router.get('/fezQuestionario/:idUsuario', function (req, res) {
    usuarioController.fezQuestionario(req, res);
});

module.exports = router;