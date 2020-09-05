// all passport related info here for user auth

const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');

function init(passport, getUserByEmail, getUserById)
{
    const authenticateUser = async (email, password, done) => 
    {
        let user = await getUserByEmail(email);
        if (user == null)
        {
            return done(null, false, { message: "No user with that email exists!"});
        }

        try
        {
            const verify = await argon2.verify(user.password, password);
            if (verify)
            {
                console.log("User [" + user.username + "] has successfully logged in");
                return done(null, user);
            }
            else
            {
                return done(null, false, { message: "Password incorrect!"});
            }
        }
        catch (e) { return done(e); /* something errored out internally, report */ }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => 
    {
        userById = await getUserById(id);
        return done(null, userById);
    });
}

module.exports = { init: init };