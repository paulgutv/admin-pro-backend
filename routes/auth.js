/*
Path: '/api/login'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
  check('email', 'El email es necesario').isEmail(),
  check('password', 'El password es necesario').not().isEmpty(),
  validarCampos
], login)


module.exports = router;