
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const functions = require("firebase-functions");

export const cors = require('cors')({
  origin: true
}); 



// export const cors = require("cors")({
//   origin: (origin, callback) => {
//     if (['http://localhost:4200"'].indexOf(origin)!== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// });

export const randomString = (length:number): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const alphabet_length = alphabet.length - 1;
  let password = "";
  for (let i = 0; i < length; i++) {
    const random_number = Math.floor(Math.random() * alphabet_length) + 1;
    password += alphabet[random_number];
  }
  return password
}


export const encrypt = (text) => {
  const CRIPTO_API_KEY = functions.config().cripto.key;
  const cipher = crypto.createCipher(algorithm,CRIPTO_API_KEY)
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
export const  decrypt = (text) => {
  const CRIPTO_API_KEY = functions.config().cripto.key;
  const decipher = crypto.createDecipher(algorithm, CRIPTO_API_KEY)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


