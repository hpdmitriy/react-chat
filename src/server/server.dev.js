import express from 'express';
import path from 'path';
import config from 'config';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import {RouterContext, match} from 'react-router';
import routes from '../common/routes';
import createHistory from 'history/createMemoryHistory';
import DevTools from '../common/containers/DevTools';
import cors from 'cors';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev';
const compiler = webpack(webpackConfig);
import passport from 'passport';
require('../../config/passport')(passport);
require('./modules/db/mongoose');
import SocketIo from 'socket.io';
import morgan from 'morgan';

//const port = config.port;


const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

process.on('uncaughtException', (err) => {
    console.log(err);
});
app.use(cors());
app.use(passport.initialize());

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

const messageRouter = express.Router();
const usersRouter = express.Router();
const channelRouter = express.Router();
require('./routes/message_routes')(messageRouter);
require('./routes/channel_routes')(channelRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.get('/*', function(req, res) {
    const history = createHistory()
    const location = history.location

    match({ routes, location }, (err, redirectLocation, renderProps) => {

        if(err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if(!renderProps) {
            return res.status(404).end('Not found');
        }

        const store = configureStore();

        const InitialView = (
            <Provider className='root' store={store}>
                <div style={{height: '100%'}}>
                    <RouterContext {...renderProps} />
                </div>
            </Provider>
        );

        const initialState = store.getState();
        const html = renderToString(InitialView);
        res.status(200).end(require('./modules/template/')(html, initialState));
    });
});

const server = app.listen(app.get('port'), 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Dev server listening on port: ', app.get('port'));
});

const io = new SocketIo(server, {path: '/api/chat'});
const socketEvents = require('./modules/socket/')(io);
