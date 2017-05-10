import React from 'react';
import { Link } from 'react-router';

export default class ErrorPage extends React.Component {

    render() {
        return (
            <div className='col-xs-12 article'>
                <div className='jumbotron'>
                    <h1>404</h1>
                    <h3>Страница не найдена</h3>
                    <p>Перейти на <Link to='/'>главную</Link></p>
                </div>
            </div>
        );
    }

}
