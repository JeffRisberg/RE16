import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {

    render() {
        return (
            <div>
                <h2>RE16 Example</h2>

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