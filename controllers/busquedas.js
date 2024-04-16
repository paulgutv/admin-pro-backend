const { response } = require("express");
const Hospital = require("../models/hospital");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    await Usuario.find({ nombre: regex }),
    await Medico.find({ nombre: regex }),
    await Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let resultados = [];

  switch (tabla) {
    case 'medicos':
      resultados = await Medico.find({nombre:regex})
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
      break;
    case 'hospitales':
      resultados = await Hospital.find({nombre:regex})
      .populate('usuario', 'nombre img')
      break;
    case 'usuarios':
      resultados = await Usuario.find({nombre:regex})
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
      })
  }
  res.json({
    ok: true,
    resultados,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
