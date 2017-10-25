const db_util = {
    db_message: Object.freeze({
        DB_FAILED: "ERROR: db is not reached",
        DB_SUCCESS: "SUCCESS: operation success",
        USER_NOT_EXIST: "ERROR: user does not exist",
        USER_EXIST: "SUCCESS: user exist",
        USER_ADD: "SUCCESS, user added or modified",
        USER_NOT_ADD: "ERROR: user does not add or modified",
        TOKEN_RENEW: "SUCCES: token updated",
        TOKEN_NOT_RENEW: "ERROR: token not renew",
        USER_DELETED : "SUCCES: user deleted",
        USER_NOT_DELETED: "ERROR: user not deleted"
    }),

    db_operation: Object.freeze({
        ADD_USER: "ADD_USER",
        DELETE_USER: "DELETE_USER",
        FIND_USER: "FIND_USER",
        RENEW_TOKEN: "RENEW_TOKEN",
        EXIST_USER: "EXIST_USER"
    }),

    db_make_status: (type, success, msg) => ({
        action: type,
        success: success,
        msg: msg
    })
}

module.exports = db_util;