import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import {Input, Button} from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class SignUp extends Component {

    static propTypes = {
        homePage: PropTypes.string.isRequired,
        userValidation: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,

    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.homePage || '',
            password: '',
            confirmPassword: ''
        };
    }

    componentWillMount() {
        const {dispatch, userValidation} = this.props;
        if (userValidation.length === 0) {
            dispatch(actions.usernameValidationList());
        }
    }

    componentDidMount() {
        if (this.state.username.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        } else {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        if (!this.state.username.length) {
            this.refs.usernameInput.getInputDOMNode().focus();
        }
        if (this.state.username.length && !this.state.password.length) {
            this.refs.passwordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
            this.refs.confirmPasswordInput.getInputDOMNode().focus();
        }
        if (this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
            const userObj = {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            };
            dispatch(authActions.signUp(userObj));
            const initChat = {
                name: 'React-Chat',
                id: 0,
                private: false
            };
            dispatch(actions.createChannel(initChat));
            this.setState({username: '', password: '', confirmPassword: ''});
        }
    }

    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        if (event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
        if (event.target.name === 'confirm-password') {
            this.setState({confirmPassword: event.target.value});
        }
    }

    validateUsername() {
        const {userValidation} = this.props;
        if (userValidation.filter(user => {
            return user === this.state.username.trim();
        }).length > 0) {
            return 'error';
        }
        return 'success';
    }

    validateConfirmPassword() {
        if (this.state.confirmPassword.length > 0 && this.state.password.length > 0) {
            if (this.state.password === this.state.confirmPassword) {
                return 'success';
            }
            return 'error';
        }
    }

    render() {
        return (
            <div className='container page_signup'>
                <div className='page-header'>
                    <h1>Registration in to the React Chat</h1>
                </div>
                <main className='panel panel-default page_signup__body'>
                    <form className='panel-body' onSubmit={::this.handleSubmit}>
                        <div className='form-group'>
                            <Input
                                label='Username'
                                ref='usernameInput'
                                type='text'
                                help={::this.validateUsername() === 'error' && 'A user with that name already exists!'}
                                bsStyle={::this.validateUsername()}
                                hasFeedback
                                name='username'
                                autoFocus='true'
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={::this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <Input
                                label='Password'
                                ref='passwordInput'
                                type='password'
                                name='password'
                                value={this.state.password}
                                placeholder='Enter password'
                                onChange={::this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <Input
                                label='Confirm Password'
                                ref='confirmPasswordInput'
                                help={this.validateConfirmPassword() === 'error' && 'Your password doesn\'t match'}
                                type='password'
                                name='confirm-password'
                                placeholder='Enter password again' value={this.state.confirmPassword}
                                onChange={::this.handleChange}
                            />
                        </div>
                        <Button
                            disabled={this.validateUsername() === 'error' || this.validateConfirmPassword() === 'error' && true}
                            bsStyle='success'
                            style={{width: '100%'}}
                            onClick={::this.handleSubmit}
                            type='submit'>
                            Зарегистрироваться
                        </Button>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        homePage: state.homePage,
        userValidation: state.userValidation.data
    };
}

export default connect(mapStateToProps)(SignUp);
