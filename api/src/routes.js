const express = require('express');

const router = express.Router();

const Middleware = require('./middleware/middleware');
const Colaborador = require('./controllers/colaborador');
const Os = require('./controllers/os');
const Comentario = require('./controllers/comentario');

router.post('/login', Colaborador.login);
router.post('/colaborador', Colaborador.create);
router.get('/colaborador', Middleware.validaAcesso, Colaborador.read);
router.get('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.read);
router.put('/colaborador', Middleware.validaAcesso, Colaborador.update);
router.delete('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.del);

router.post('/comentario', Comentario.create);
router.get('/comentario', Middleware.validaAcesso, Comentario.read);
router.get('/comentario/:id', Middleware.validaAcesso, Comentario.read);
router.put('/comentario', Middleware.validaAcesso, Comentario.update);
router.delete('/comentario/:id', Middleware.validaAcesso, Comentario.del);

router.post('/os', Os.create);
router.get('/os', Middleware.validaAcesso, Os.read);
router.get('/os/:id', Middleware.validaAcesso, Os.read);
router.put('/os', Middleware.validaAcesso, Os.update);
router.delete('/os/:id', Middleware.validaAcesso, Os.del);

router.get('/', (req, res) => { 
    return res.json("API OSs respondendo");
});

module.exports = router;
