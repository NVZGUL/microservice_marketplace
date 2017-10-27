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
  
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_AUTH_ID,
            clientSecret: process.env.GOOGLE_AUTH_SECRET,
            callbackURL: "/auth/google/callback"
        }, 
        (req, accessToken, refreshToken, profile, done) => {
            process.nextTick(async () => {
                if(!req.user) {
                    try {
                        const data = await redis_db.findUser(profile.id);
                        if (data.success && data.msg != db_message.USER_NOT_EXIST) {
                            const data2 = await redis_db.addUser(
                                profile.id,
                                profile.emails[0].value.toLowerCase(),
                                profile.displayName);
                            const data3 = await redis_db.findUser(profile.id);
                            return done(null, data3.msg)
                        } else 
                            return done(null, false)
                            
                    } catch (error) {
                        done(error.msg)
                    }
                }
                // user logined
                else {
                    redis_db.addUser(
                        profile.id,
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