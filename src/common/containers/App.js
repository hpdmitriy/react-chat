import React, {PropTypes} from 'react';

export default class App extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired
    };
    render() {
        return (
            <div style={{height: '100%'}}>
                {this.props.children}
            </div>
        );
    }
}

