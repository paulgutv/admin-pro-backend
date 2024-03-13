/*
Path: '/api/hospitales
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require("../middlewares/validar-jwt");
const { crearHospital, getHospitales, actualizarHospital, borrarHospital } = require("../controllers/hospitales");

const router = Router();

router.get("/", getHospitales);

router.post(
  "/",
  [
    validarJWT,
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    validarCampos
  ],
  crearHospital
);

router.put('/:id', 
  [],
  actualizarHospital
);

router.delete('/:id', borrarHospital);

module.exports = router;
