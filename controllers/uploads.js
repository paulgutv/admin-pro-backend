const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req = request, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;


  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if(!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital (tipo)'
    })
  }

  //Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningún archivo'
    });
  }

  //Procesar imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //Validar extensión
  const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];
  if(!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extensión válida (tipo)'
    })
  }

  //Generar el nombre de archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen'
      })
    }

    //Actualizar imagen
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo
    })
  });  
}

const retornaImagen = async(req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //Imagen por defecto
  if(fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, '../uploads/no-img.jpg');
    res.sendFile(pathImg);
  }

}

module.exports = {
  fileUpload,
  retornaImagen
}