const bcrypt = require('bcrypt');

const plainPassword = 'Torremolinos12!';
const hashedPassword = '$2b$10$0jieF.uBSHMQaqnHiQhlUOdCpOFGgtttYgQSSD68nXLP.8hBpLOzi';

console.log('Iniciando comparación de contraseñas...');
console.log('Contraseña en texto plano:', plainPassword);
console.log('Contraseña hasheada:', hashedPassword);

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparando contraseñas:', err);
  } else {
    console.log('Las contraseñas coinciden:', isMatch);
  }
});
