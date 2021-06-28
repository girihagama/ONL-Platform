import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, List, Icon, Message, Label } from 'semantic-ui-react';

import DeleteConfirmationModal from './DeleteConfirmationModal';

class BranchListSub extends Component {
    render() {
        console.log("SC", this.props);
        var identifier = this.props.doc + "-locations";

        return (
            (!this.props.firestore.ordered[this.props.doc + "-locations"])
                ?
                <Label>
                    Loading...
                </Label>
                :
                <div>
                    <List relaxed divided celled className='optionList'>
                        {(this.props.firestore.ordered[this.props.doc + "-locations"]).map((item, index) => {
                            return (
                                <List.Item className='optionListItem' key={item.id}>
                                    <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                        <Button.Group size='tiny'>
                                            <DeleteConfirmationModal triggerElement={<Button animated='fade'>
                                                <Button.Content hidden style={{ color: 'red' }}>
                                                    Delete
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='trash' />
                                                </Button.Content>
                                            </Button>} function={this.props.function} functionParams={[this.props.functionParams[0], item.id]} dataType="Location" trigger="Delete Location" dismissable={false} description={"Delete [" + item.locationName + "] location of [" + this.props.functionParams[1] + "] customer"} />
                                            <Button animated='fade'>
                                                <Button.Content hidden style={{ color: '#e65800' }}>
                                                    Edit
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='pencil' />
                                                </Button.Content>
                                            </Button>
                                        </Button.Group>
                                    </List.Content>
                                    <List.Icon name="location arrow" size='large' verticalAlign="middle" />
                                    <List.Content>
                                        <List.Header>{item.locationName}</List.Header>
                                        <List.Description>
                                            Address: {(!item.locationAddress) ? "N/A" : item.locationAddress}<br />
                                            Email: {(!item.locationEmail) ? "N/A" : <a href={"mailto:" + item.locationEmail}>{item.locationEmail}</a>}<br />
                                            Contact : {"".replace(/ /g, "\u00a0")}
                                            {(!item.contact)
                                                ?
                                                "N/A"
                                                :
                                                Object.entries(item.contact).map(([key, value], index) => {
                                                    return (
                                                        <Label style={{marginTop:"2px"}}><a href={"callto:"+value}>{value}</a> ({key})</Label>
                                                    )
                                                })
                                            }
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>

                    {
                        (this.props.firestore.ordered[this.props.doc + "-locations"].length == 0)
                            ?
                            <Message visible>
                                No locations available for this customer, Try addning a new one.
                            </Message>
                            : ""
                    }
                </div>
        )
    }
}

const mstp = (state) => {
    return state;
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'customers', doc: props.doc, subcollections: [{ collection: 'locations' }], storeAs: props.doc + "-locations" }
    ]),
    connect(mstp, null),
)(BranchListSub);