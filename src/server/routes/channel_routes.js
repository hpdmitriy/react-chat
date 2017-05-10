const Channel = require('../models/Channel');
const bodyparser = require('body-parser');

module.exports = function(router) {
    router.use(bodyparser.json());
    router.post('/channels/new_channel', function(req, res) {
        const newChannel = new Channel(req.body);
        newChannel.save(function(err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    });
};
