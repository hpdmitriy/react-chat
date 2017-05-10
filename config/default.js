import path from 'path';

module.exports = {
    port: 3000,
    siteHost: 'http://localhost:3000',
    secret: 'mysecret',
    root: process.cwd(),
    mongoose: {
        uri: 'mongodb://localhost/chatapp',
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
