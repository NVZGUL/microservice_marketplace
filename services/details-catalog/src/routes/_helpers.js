const request = require('request-promise');

let ensureAuth = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    const err = new Error('Unauthorized');
    err.status = 401;
    err.description = 'Please Log In';
    return next(err);
  }
  const options = {
    method: 'GET',
    uri: 'http://admin-auth:3000/auth/getUser',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
    },
  };
  return request(options)
    .then((response) => {
      req.user = response.user;
      next();
    })
    .catch((err) => { next(err); });
};

if (process.env.NODE_ENV === 'test') {
  ensureAuth = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
      const err = new Error('Unauthorized');
      err.status = 401;
      err.description = 'Please Log In';
      return next(err);
    }
    req.user = 1;
    return next();
  };
}

module.exports = {
  ensureAuth,
};
