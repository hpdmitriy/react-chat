import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button, Input} from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class SignIn extends Component {

    static propTypes = {
        homePage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.homePage || '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        } else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    }

    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        if (event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        if (this.state.username.length < 1) {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
        if (this.state.username.length > 0 && this.state.password.length < 1) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            var userObj = {
                username: this.state.username,
                password: this.state.password
            };
            dispatch(authActions.signIn(userObj))
            this.setState({username: '', password: ''});
        }
    }

    render() {
        return (
            <div className='container page_signin'>
                <div className='page-header'>
                    <h1>log in to the React Chat</h1>
                </div>
                <main className='panel panel-default page_signin__body'>
                    <form className='panel-body' onSubmit={::this.handleSubmit}>
                        <div className='form-group'>
                            <Input
                                className='form-control'
                                label='Username'
                                ref='usernameInput'
                                type='text'
                                name='username'
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={::this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <Input
                                className='form-control'
                                label='Password'
                                ref='passwordInput'
                                type='password'
                                name='password'
                                placeholder='Enter password'
                                value={this.state.password}
                                onChange={::this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <Button
                                className='btn btn-success col-xs-12'
                                name='submitButton'
                                type='submit'>
                                <span>Авторизоваться</span>
                            </Button>
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        homePage: state.homePage
    };
}
export default connect(mapStateToProps)(SignIn);
