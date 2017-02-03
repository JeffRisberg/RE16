import React from 'react'
import Helmet from 'react-helmet';

import { Link } from 'react-router'

import NamedStyleResolution from './NamedStyleResolution'
import ComposedStyleResolution from './ComposedStyleResolution'

class Home extends React.Component {

    render() {
        return (
            <div>
                <Helmet
                    title="Home"
                    meta={[
                        {property: 'og:title', content: 'Home'},
                    ]} />
                <h2>RE16 Example</h2>

                <NamedStyleResolution />
                <ComposedStyleResolution />
                <br/>
                <ul>
                    <li>
                        Uses React for presentation
                    </li>
                    <li>
                        Uses Redux for data management, with Redux-sagas
                    </li>
                    <li>
                        Uses Node backend, with NEDB as proxy database
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;