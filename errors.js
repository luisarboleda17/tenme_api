
/**
 * User already exist with those credentials
 */
class UserExistError extends Error { constructor() { super('User already exist with those credentials.'); } }

class UserNotExistError extends Error { constructor() { super('User not exist with those credentials.'); } }

class WrongPasswordError extends Error { constructor() { super('Wrong Password.'); } }

module.exports = {
  USER_EXIST: UserExistError,
  USER_NOT_EXIST: UserNotExistError,
  WRONG_PASSWORD: WrongPasswordError
};
