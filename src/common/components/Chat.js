
import React, {Component, PropTypes} from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import * as actions from '../actions/actions';
import * as authActions from '../actions/authActions';
import {Link} from 'react-router';

export default class Chat extends Component {

    static propTypes = {
        messages: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        channels: PropTypes.array.isRequired,
        activeChannel: PropTypes.string.isRequired,
        typers: PropTypes.array.isRequired,
        socket: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            privateChannelModal: false,
            targetedUser: ''
        };
    }

    componentDidMount() {
        const {socket, user, dispatch} = this.props;
        socket.emit('chat mounted', user);
        socket.on('new bc message', msg =>
            dispatch(actions.receiveRawMessage(msg))
        );
        socket.on('typing bc', user =>
            dispatch(actions.typing(user))
        );
        socket.on('stop typing bc', user =>
            dispatch(actions.stopTyping(user))
        );
        socket.on('new channel', channel =>
            dispatch(actions.receiveRawChannel(channel))
        );
        socket.on('receive socket', socketID =>
            dispatch(authActions.receiveSocket(socketID))
        );
        socket.on('receive private channel', channel =>
            dispatch(actions.receiveRawChannel(channel))
        );
    }

    componentDidUpdate() {
        const messageList = this.refs.messageList;
        messageList.scrollTop = messageList.scrollHeight;
    }

    handleSave(newMessage) {
        const {dispatch} = this.props;
        if (newMessage.text.length !== 0) {
            dispatch(actions.createMessage(newMessage));
        }
    }

    handleSignOut() {
        const {dispatch} = this.props;
        dispatch(authActions.signOut());
    }


    render() {
        const {messages, socket, activeChannel, dispatch, user} = this.props;
        const filteredMessages = messages.filter(message => message.channelID === activeChannel);
        const username = this.props.user.username;
        const bigNav = (
            <div>
                <h2>
                    <i className='fa fa-user-secret' /> &nbsp;

                    {username}
                </h2>
                <h4>
                    <Link to='/'>
                        Перейти на главую
                    </Link>
                </h4>
                <h4 onClick={::this.handleSignOut}>
                    <Link to='/'>
                        Выход
                    </Link>
                </h4>
            </div>
        );
        return (
            <div className='container page_chat'>
                <div className='page-header'>
                    <h1>{activeChannel}</h1>
                </div>
                <div className='row'>
                    <div className='page_chat__nav col-xs-4'>
                        { bigNav }
                    </div>
                    <div className='page_chat__body col-xs-8'>
                        <ul className='page_chat__list' ref='messageList'>
                            {filteredMessages.map(message =>
                                <MessageListItem
                                    message={message}
                                    key={message.id}/>
                            )}
                        </ul>
                        <MessageComposer socket={socket} activeChannel={activeChannel} user={user}
                                         onSave={::this.handleSave}/>
                    </div>
                </div>
            </div>
        );
    }
}
