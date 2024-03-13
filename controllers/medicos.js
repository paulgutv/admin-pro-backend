const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos
  })
}

const crearMedico = async (req, res = response) => {
  const uid = req.uid;

  const medico = new Medico({
    usuario: uid, ...req.body
  });

  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Llame a su administrador'
    })
  }

  
}

const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizar medico'
  })
}

const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'borrar medico'
  })
}

module.exports = {
  getMedicos,
  actualizarMedico,
  crearMedico,
  borrarMedico
}