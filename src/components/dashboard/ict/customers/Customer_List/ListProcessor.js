import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ListItems from './ListItems';

class ListProcessor extends Component {
    state = {
        firstItem: (!this.props.firestore.ordered.customerList) ? "" : this.props.firestore.ordered.customerList[0].createdDate,
        lastItem: (!this.props.firestore.ordered.customerList) ? "" : this.props.firestore.ordered.customerList[this.props.firestore.ordered.customerList.length - 1].createdDate,
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <ul>
                    {
                        (this.props.firestore.ordered.customerList) ?
                            <ListItems itemList={this.props.firestore.ordered.customerList} />
                            : ""
                    }
                </ul>
                {
                    (this.props.firestore.ordered.customerList) ?
                        <div>
                            <Button onClick={() => {
                                this.props.functions.setFirstItem(this.state.lastItem);
                            }} floated="left">Previous</Button>
                            <Button onClick={() => {
                                this.props.functions.setLastItem(this.state.firstItem);
                            }} floated="right">Next</Button>
                        </div>
                        : ""
                }
            </div>
        );
    }
}

const mstp = (state) => {
    return state;
}

export default compose(
    firestoreConnect(
        (props) => [
            { collection: 'customers', orderBy: ["createdDate", "desc"], limit: props.limit, storeAs: "customerList", startAt: props.startAt, endAt: props.endAt, },
        ]
    ),
    connect(mstp, null)
)(ListProcessor);