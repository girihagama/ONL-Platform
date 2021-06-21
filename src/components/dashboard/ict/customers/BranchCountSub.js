import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Label,Icon } from 'semantic-ui-react';

class BranchCountSub extends Component {
    render() {
        console.log("SC", this.props);
        var identifier = this.props.doc + "-locations"
        return (
            <Label>
                <Icon name='location arrow' />
                Branches
                <Label.Detail>{(!this.props.firestore.ordered[identifier]) ? "Loading..." : (this.props.firestore.ordered[identifier]).length}</Label.Detail>
            </Label>
        );
    }
}

const mstp = (state) => {
    return state;
    // OR return specific object as follows
    /*return {
        objectname : state.objectname
    }*/
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'customers', doc: props.doc, subcollections: [{ collection: 'locations' }], storeAs: props.doc + "-locations" }
    ]),
    connect(mstp, null),
)(BranchCountSub);