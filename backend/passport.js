const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Promise = require('promise');
const redis_db = require('./db/redis_db');
const db_message = require('./db/util/db_util').db_message;

const UserValidationError = (err_msg) => new Promise((resolve, reject) => reject(err_msg)).then(null, console.log);

const passportConf = (passport) => {

    passport.serializeUser((user, done) => done(null, user['google-id']));

    passport.deserializeUser(async (id, done) => {
        try {
            const res = await redis_db.findUser(id)
            return res.msg !== db_message.USER_NOT_EXIST ? done(null, res.msg) : done(null, false) 
        } catch (error) {
            return done(error);
        }
    })
    /*
    passport.deserializeUser((id, done) => redis_db.findUser(id).done(
        (res) => res.msg !== db_message.USER_NOT_EXIST ? done(null, res.msg) : done(null, false),
        (err) => done(err)
    ));
    */
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_AUTH_ID,
            clientSecret: process.env.GOOGLE_AUTH_SECRET,
            callbackURL: "/auth/google/callback"
        }, 
        (req, accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                if(!req.user) {
                    redis_db.findUser(profile.id).then(
                        (res_find) => {
                            if(res_find.success && res_find.msg !== db_message.USER_NOT_EXIST) {
                                redis_db.addUser(
                                    profile.id,
                                    accessToken,
                                    profile.emails[0].value.toLowerCase(),
                                    profile.displayName
                                ).then(
                                    (res_add) => 
                                        res_add.success && res_add.msg === db_message.USER_ADD ? 
                                            redis_db.findUser(profile.id).then(
                                                (res_find) => done(null, res_find.msg)
                                            ) : done(res_make.msg)
                                    ,
                                    (err_add) => done(err_add.msg)
                                );
                            }
                            else done(null, false)
                        },
                        (err_find) => done(err_find.msg)
                    )
                }
                // user logined
                else {
                    redis_db.addUser(
                        profile.id,
                        accessToken,
                        profile.emails[0].value.toLowerCase(),
                        profile.displayName
                    ).then(
                        (res_add) =>
                            res_add.success && res_add.msg === db_message.USER_ADD ?
                                redis_db.findUser(profile.id).then(
                                    (res_find) => done(null, res_find.msg)
                                ) : done(res_add.msg),
                        (err_add) => done(err_add.msg)
                    )
                } 
            });
        })
    )
}

module.exports = passportConf;