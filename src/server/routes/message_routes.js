const Message = require('../models/Message');
const bodyparser = require('body-parser');

module.exports = function(router) {
    router.use(bodyparser.json());
    router.get('/messages/:channel', function(req, res) {
        Message.find({channelID: req.params.channel}, function(err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    });

    router.post('/newmessage', function(req, res) {
        const newMessage = new Message(req.body);
        newMessage.save(function(err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    });
}
