import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CustomerSearch extends Component {
    render() {
        return (
            // <datalist id='customers'>
            //     {
            //         (this.props.firestore.ordered.customerSearchResults).map((item, index) => {
            //             return (
            //                 <option key={index} value={item.id}>{item.customerName}</option>
            //             )
            //         })
            //     }
            // </datalist>
            <datalist id='customers' onSelect={(e) => console.log(e.target.value)}>
                {
                    (this.props.firestore.ordered.searchList).map((item, index) => {
                        return (
                            <option key={index} value={item.customerName} data={item.id}>{item.customerName}</option>
                        )
                    })
                }
            </datalist>
        );
    }
}

const mstp = (state) => {
    return state;
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'customers', storeAs: 'searchList' }
    ]),
    connect(mstp, null),
)(CustomerSearch);