const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  resetPasswordRequests: [{ type: Date }]  // Array para almacenar las fechas de las solicitudes
});

// Antes de guardar el usuario en la base de datos, hashear la contraseña
userSchema.pre('save', async function (next) {
  try {
    // Solo hashear la contraseña si ha sido modificada o es nueva
    if (!this.isModified('password')) {
      return next();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
