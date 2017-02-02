import React from 'react';

import { Link } from 'react-router'

import body from '../styles/re16.scss';

class AppView extends React.Component {

    render() {
        return (
            <div className={body}>
                <img src="/images/logo.gif"/>
                <br/>
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

export default AppView;
