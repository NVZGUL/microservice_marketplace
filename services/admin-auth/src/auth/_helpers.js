const local = require('./local');
const redisDb = require('../utils/redis_db');
/* eslint-disable consistent-return */
const ensureAuth = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
  const token = req.headers.authorization.split(' ')[1];
  local.decodeToken(token, (err, payload) => {
    if (err) {
      const error = new Error('Unauthorized');
      error.status = 401;
      error.message = 'Token has expired';
      return next(error);
    }
    return redisDb.findUser(payload.sub)
      .then((response) => {
        if (response.success) {
          req.pay = response;
          return next();
        }
        const error = new Error(response.msg);
        error.status = 404;
        return next(error);
      })
      .catch((error) => { next(error); });
  });
};

module.exports = {
  ensureAuth,
};
