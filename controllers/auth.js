const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

const login = async(req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });

    //verificar email
    if(!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    //verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida'
      })
    }

    //generar JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok:true,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'Hable con el administrador'
    })
  }
}

const googleSignIn = async(req, res = response) => {

  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({email: email});
    let usuario;

    if(!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    //guardar usuario
    await usuario.save();

    //generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Token de Google no es correcto'
    })
  }

}

const renewJWT = async (req, res = response) => {
  const uid = req.uid;

  const token = await generarJWT(uid);

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  login,
  googleSignIn,
  renewJWT
}