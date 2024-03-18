/*
Path: '/api/login'
*/

const { Router } = require('express');
const { login, googleSignIn, renewJWT } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post('/', [
  check('email', 'El email es necesario').isEmail(),
  check('password', 'El password es necesario').not().isEmpty(),
  validarCampos
], login)

router.post('/google', [
  check('token', 'El token de google es necesario').not().isEmpty(),
  validarCampos
], googleSignIn)

router.get('/renew',
  validarJWT,
  renewJWT
)


module.exports = router;