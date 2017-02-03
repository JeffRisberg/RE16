import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet';

import { connect } from 'react-redux'
import { requestCharities } from '../redux/modules/charities'

import charities from './charities.scss';

class CharityList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(requestCharities());
    }

    render() {
        const { records, isFetching, lastUpdated } = this.props

        const charityNodes = records.map((charity, key) => {
            return (
                <tr key={key}>
                    <td className={charities.name}>
                        {charity.name}
                    </td>
                    <td className={charities.description}>
                        {charity.description}
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <Helmet
                    title="Charities"
                    meta={[
                        {property: 'og:title', content: 'Charities'},
                    ]} />
                <p>
                    {lastUpdated &&
                    <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}</span>
                    }
                </p>
                {isFetching && records.length === 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && records.length === 0 &&
                <h2>Empty.</h2>
                }
                {records.length > 0 &&
                <table className={charities.table}>
                    {charityNodes}
                </table>
                }
            </div>
        )
    }
}

CharityList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        records: state.charities.items || [],
        isFetching: state.charities.isFetching || false,
        lastUpdated: state.charities.lastUpdated
    };
};

export default connect(
    mapStateToProps
)(CharityList)
