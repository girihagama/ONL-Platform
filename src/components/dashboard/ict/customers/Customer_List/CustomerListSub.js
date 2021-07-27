import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ListProcessor from './ListProcessor';

class CustomerListSub extends Component {
    state = {
        resultLimit: (this.props.resultLimit) || 3,
        startAt: "",
        endAt: "",
        startAfter: "",
        endBefore: "",
        counter: ""
    }

    setFirstItem = (firstItem) => {
        this.setState({ firstItem, lastItem: "" });
    }

    setLastItem = (lastItem) => {
        this.setState({ lastItem, firstItem: "" });
    }

    next = (startAfter) => {
        this.setState({ counter: this.state.counter + 1, startAfter });
    }

    previous = (endBefore) => {
        this.setState({ counter: this.state.counter - 1, endBefore });
    }

    render() {
        return (
            <div>
                <ListProcessor functions={{ setFirstItem: this.setFirstItem, setLastItem: this.setLastItem }} startAt={this.state.firstItem} endAt={this.state.lastItem} limit={this.state.resultLimit} />
                <br />
            </div>
        )
    }
}

export default CustomerListSub;