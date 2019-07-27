
const fs = require('fs');

let PUBLIC_KEY;
let PRIVATE_KEY;

try {
  PUBLIC_KEY = fs.readFileSync('./public.key', 'utf8');
  PRIVATE_KEY = fs.readFileSync('./private.key', 'utf8');
} catch (err) {
  console.error('Public and private key not found. Using default keys.', err);
}


module.exports = {
  APP_NAME: 'Tenme',
  ACCOUNT_TYPES: {
    SAVING: 'saving',
    CHECKING: 'checking'
  },
  DOCUMENT_TYPES: {
    ID: 'id',
    PASSPORT: 'passport'
  },
  PASSWORD_SALT_ROUNDS: 10,
  DEFAULT_SIGN_TOKEN_KEY: PRIVATE_KEY ? PRIVATE_KEY : 'tenme',
  DEFAULT_VERIFY_TOKEN_KEY: PUBLIC_KEY ? PUBLIC_KEY : 'tenme',
  PAYMENT_METHODS_TYPES: {
    CARD: 'card',
    ACCOUNT: 'account'
  }
};
