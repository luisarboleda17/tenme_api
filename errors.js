
/**
 * User already exist with those credentials
 */
class UserExistError extends Error { constructor() { super('User already exist with those credentials.'); } }

class UserNotExistError extends Error { constructor() { super('User not exist with those credentials.'); } }

class WrongPasswordError extends Error { constructor() { super('Wrong Password.'); } }

class ServiceNotExistError extends Error { constructor() { super('Service not exist with these id.'); } }

class BalanceNotAvailableError extends Error { constructor() { super('Your account doesnt have enugh credits to do this operation.'); } }

module.exports = {
  USER_EXIST: UserExistError,
  USER_NOT_EXIST: UserNotExistError,
  WRONG_PASSWORD: WrongPasswordError,
  SERVICE_NOT_EXIST: ServiceNotExistError,
  BALANCE_NOT_AVAILABLE: BalanceNotAvailableError
};
