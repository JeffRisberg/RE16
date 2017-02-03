import React from 'react';

import { Link } from 'react-router'

class AppView extends React.Component {

    render() {
        return (
            <div>
                <ul className='navlist'>
                    <li><img src="/images/logo.gif"/></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/charities">Charities</Link></li>
                    <li><Link to="/donations">Donations</Link></li>
                </ul>

                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AppView;
