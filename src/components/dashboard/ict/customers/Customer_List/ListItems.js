import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class ListItems extends Component {    
    render() {
        return (
            (this.props.itemList).map(item => {
                return (
                    <li key={item.id}>{item.customerName}</li>
                );
            })
        );
    }
}

const mstp = (state) => {
    return state;
}

export default ListItems;