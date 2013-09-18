var auth = module.exports = require('connect-auth'),
    _ = require('underscore');

_.extend(auth, {
    signIn: require('./signIn'),
    signUp: require('./signUp'),
    signOut: require('./signOut'),
    strategies: {
        facebook: {},
        twitter: {},
        google: {}
    }
});