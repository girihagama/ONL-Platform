import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Customers extends Component {
    render() {
        console.log('PROPS', this.props);

        return (
            <Segment>
                <Container>
                    Customers
                </Container>
            </Segment>
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
    firestoreConnect(() => [
        { collection: 'customers' }
    ]),
    connect(mstp),
)(Customers);