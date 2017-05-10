const bodyparser = require('body-parser');
const User = require('../models/User.js');

module.exports = function loadUserRoutes(router, passport) {
    router.use(bodyparser.json());

    router.post('/sign_up', passport.authenticate('local-signup', {session: false}), function(req, res) {
        res.json(req.user);
    });

    router.post('/sign_in', passport.authenticate('local-login', {session: false}), function(req, res) {
        res.json(req.user);
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.end();
    });
};
