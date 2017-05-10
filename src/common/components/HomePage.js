import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {homePage} from '../actions/actions';
import {connect} from 'react-redux';

class HomePage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: ''
        };
    }

    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
    }

    handleSubmit() {
        const {dispatch} = this.props;
        const username = this.state.username;
        dispatch(homePage(username));
        this.setState({username: ''});
    }

    render() {
        return (
            <div className='container page_home'>
                <div className='page-header'>
                    <h1>Welcome to React Chat</h1>
                </div>
                <main className='panel panel-default page_home__body'>
                    <form className='panel-body'>
                        <div className='form-group'>
                           Вы можете
                        </div>
                        <div className='form-group'>
                            <Link to='/signin'>
                                <button className='btn btn-success col-xs-12'>Войти</button>
                            </Link>
                        </div>
                        <div className='text-center'>или</div>
                        <div className='form-group'>
                            <Link to='/signup'>
                                <button
                                    className='btn btn-primary col-xs-12'
                                    type='submit'
                                    onClick={::this.handleSubmit}>
                                    <span>Зарегистрироваться</span>
                                </button>
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        screenWidth: state.environment.screenWidth
    };
}

export default connect(mapStateToProps)(HomePage);
