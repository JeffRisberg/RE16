import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet';

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
                <tr key={key}>
                    <td className={donations.id}>
                        {donation.id}
                    </td>
                    <td className={donations.amount}>
                        {donation.amount}
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <Helmet
                    title="Donations"
                    meta={[
                        {property: 'og:title', content: 'Donations'},
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
                <table className={donations.table}>
                    {donationNodes}
                </table>
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
