
const boom = require('@hapi/boom');
const hoek = require('@hapi/hoek');
const jwt = require('jsonwebtoken');

const { DEFAULT_TOKEN_KEY } = require('../commons');

/**
 * Register auth scheme
 * @param server
 */
const registerScheme = server => server.auth.scheme(
  'auth-jwt',
  (server, options) => {
    hoek.assert(options, 'Missing options');
    return {
      authenticate: async (request, h) => {
        const auth_header = request.raw.req.headers.authorization;
        if (auth_header) {
          if (auth_header.toString().match(/^Bearer .+$/gi)) {
            const [_, token] = auth_header.toString().split(/\s+/);
            if (token) {
              return jwt.verify(
                token,
                options.key,
                {
                  algorithms: ['HS256'],
                  audience: server.settings.app.name,
                  issuer: server.settings.app.name,
                },
                (err, payload) => {
                  if (err) { throw boom.unauthorized('Invalid token.'); }
                  return h.authenticated({ credentials: {token}, artifacts: { id: payload.id } });
                }
              );
            } else {
              throw boom.unauthorized('No token provided.');
            }
          } else {
            throw boom.unauthorized('Invalid token format.')
          }
        } else {
          throw boom.unauthorized('Not authentication header present.');
        }
      }
    };
  }
);

/**
 * Register auth strategy
 * @param server
 * @returns {*}
 */
const registerStrategy = server => server.auth.strategy(
  'auth-jwt',
  'auth-jwt',
  {
    key: DEFAULT_TOKEN_KEY // TODO: Add public / private key
  }
);

const authPlugin = {
  register: (server, _) => {
    registerScheme(server);
    registerStrategy(server);
    server.auth.default({
      strategy: 'auth-jwt'
    });
  },
  name: 'Auth JWT'
};

authPlugin.register.attributes = {
  name: 'Auth JWT',
  version: '1.0.0',
  description: 'Plugin to verify logged users with jwt token',
  author: 'Luis Arboleda',
  license: 'Apache License 1.1'
};

module.exports = authPlugin;
