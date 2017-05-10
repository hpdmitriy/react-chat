import React, {PropTypes} from 'react';

export default class MessageListItem extends React.Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    };

    render() {
        const {message} = this.props;
        return (
            <li>
        <span>
          <b style={{color: '#1c1c1c'}}>
              {message.user.username}
          </b>
          <i style={{color: '#4b4b4b', opacity: '0.8', fontSize: '0.8em'}}> {message.time} </i>
        </span>
                <div style={{
                    clear: 'both',
                    paddingTop: '0.1em',
                    marginTop: '-1px',
                    paddingBottom: '0.5em'
                }}>{message.text}</div>
            </li>
        );
    }
}
