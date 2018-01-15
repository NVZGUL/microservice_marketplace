const dbUtil = {
  db_message: Object.freeze({
    DB_FAILED: 'ERROR: db is not reached',
    DB_SUCCESS: 'SUCCESS: operation success',
    USER_NOT_EXIST: 'ERROR: user does not exist',
    USER_EXIST: 'SUCCESS: user exist',
    USER_ADD: 'SUCCESS, user added or modified',
    USER_NOT_ADD: 'ERROR: user does not add or modified',
    TOKEN_RENEW: 'SUCCESS: token updated',
    TOKEN_NOT_RENEW: 'ERROR: token not renew',
    USER_DELETED: 'SUCCESS: user deleted',
    USER_NOT_DELETED: 'ERROR: user not deleted',
    ORDER_ADD: 'SUCCESS: order added',
    ORDER_NOT_ADD: 'ERROR: order not added',
    ORDER_EXIST: 'SUCCESS: order exist',
    ORDER_NOT_EXIST: 'ERROR: user not exist',
    VALUE_UPDATE: 'SUCCESS: key have been updated',
    VALUE_NOT_UPDATE: 'ERROR: key have not been updated',
  }),

  db_operation: Object.freeze({
    ADD_USER: 'ADD_USER',
    DELETE_USER: 'DELETE_USER',
    FIND_USER: 'FIND_USER',
    RENEW_TOKEN: 'RENEW_TOKEN',
    EXIST_USER: 'EXIST_USER',
    ADD_ORDER: 'ADD_ORDER',
    DELETE_ORDER: 'DELETE_ORDER',
    FIND_ORDER: 'FIND_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDE',
    UPDATE_VALUE: 'UPDATE_KEY_VALUE',
  }),
  /* eslint-disable object-shorthand */
  db_make_status: (type, success, msg) => ({
    action: type,
    success: success,
    msg: msg,
  }),
  /* eslint-enable object-shorthand */
};
module.exports = dbUtil;
