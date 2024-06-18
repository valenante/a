const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuración del servicio de correo
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Host del servidor SMTP de Gmail
    port: 587, // Puerto SMTP
    secure: false, // false para TLS; true para SSL
    auth: {
        user: 'valentinoantenucci1@gmail.com', // Tu dirección de correo
        pass: 'rhcm mehp ryzi jybs' // Tu contraseña de correo
    }
  });
  
  // Ruta para enviar correo electrónico
  router.post('/send-email', (req, res) => {
    // Detalles del correo electrónico
    let mailOptions = {
        from: 'valentinoantenucci1@gmail.com', // Quién envía el correo
        to: req.body.to, // A quién enviar el correo (aquí esperamos el destinatario desde el cuerpo de la solicitud POST)
        subject: req.body.subject,
        text: req.body.text, // Contenido del correo en texto plano
        html: req.body.html // Contenido del correo en formato HTML
    };
  
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).send('Correo enviado correctamente');
        }
    });
  });

  // Ruta para manejar el proceso de olvidé mi contraseña
  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Verificar si existe un usuario con el correo electrónico proporcionado
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'No se encontró un usuario con este correo electrónico' });
      }
  
      // Generar token único
      const resetToken = jwt.sign({ userId: user._id }, 'Torremolinos12!', { expiresIn: '1h' });
  
      // Almacena el token en la base de datos junto con la fecha de expiración
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Establece la expiración del token en 1 hora (3600000 milisegundos)
  
      await user.save();
  
      // Cuerpo del correo electrónico
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Para resetear tu contraseña, haz clic en este link: http://localhost:3000/resetpassword/${resetToken}`
      };
  
      // Envía el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
          return res.status(500).json({ message: 'Error al enviar el correo' });
        }
        console.log('Correo enviado:', info.response);
        res.status(200).json({ message: 'Correo enviado correctamente' });
      });
  
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  
// POST /reset-password
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
  
    try {
      // Verificar si el token es válido
      const decoded = jwt.verify(token, 'Torremolinos12!');
  
      // Buscar al usuario por su ID almacenado en el token
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Establecer la nueva contraseña hasheada
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
  
      // Guardar el usuario con la nueva contraseña
      await user.save();
  
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  

module.exports = router;
