import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { requestDonations } from '../redux/modules/donations'

import donations from './donations.scss';

class DonationList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(requestDonations());
    }

    render() {
        const { records, isFetching, lastUpdated } = this.props

        const donationNodes = records.map((donation, key) => {
            return (
                <div key={key}>
                    <div className={donations.id}>
                        {donation.id}
                    </div>
                    <div className={donations.amount}>
                        {donation.amount}
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
                <div className={donations.table}>
                    {donationNodes}
                </div>
                }
            </div>
        )
    }
}

DonationList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        records: state.donations.items || [],
        isFetching: state.charities.isFetching || false,
        lastUpdated: state.charities.lastUpdated
    };
};

export default connect(
    mapStateToProps
)(DonationList)
