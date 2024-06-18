// passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Asegúrate de tener un modelo de usuario definido

passport.use(new GoogleStrategy({
    clientID: "87203097666-tm0gt1rllbfagd1b3adh8jtpb7l7efln.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
