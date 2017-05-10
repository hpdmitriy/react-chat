import path from 'path';

module.exports = {
    port: process.env.PORT || 3001,
    siteHost: 'http://localhost:3001',
    secret: 'mysecret',
    root: process.cwd(),
    mongoose: {
        uri: 'mongodb://hdmi:1234@ds137271.mlab.com:37271/hdmiapp',
        // uri: 'mongodb://localhost/chatapp',

        options: {
            server: {
                poolSize: 5,
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }
};
