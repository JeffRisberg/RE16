import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { requestCharities } from '../actions'

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
                <div key={key}>
                    <div className={charities.name}>
                        {charity.name}
                    </div>
                    <div className={charities.description}>
                        {charity.description}
                    </div>
                </div>
            );
        });

        return (
            <div>
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
                <div className={charities.table}>
                    {charityNodes}
                </div>
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
