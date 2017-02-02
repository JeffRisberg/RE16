import React from 'react';

import { Link } from 'react-router'

class AppRoot extends React.Component {

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/charities">Charities</Link>
                <br/>
                <Link to="/donations">Donations</Link>
                <br/>

                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AppRoot;
