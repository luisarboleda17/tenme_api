
/**
 * User already exist with those credentials
 */
class UserExistError extends Error { constructor() { super('User already exist with those credentials'); } }

module.exports = {
  USER_EXIST: UserExistError
};
