require('dotenv').config();

// A library to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

export function getSigningKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

export const jwtOptions = {
  audience: `${process.env.AUTH0_CLIENT_ID}`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
};
