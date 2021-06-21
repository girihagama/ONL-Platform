import React, { Component } from 'react';
import { Container, Segment, Grid, List, Header, Input, Button, Icon, Label, Message, Checkbox, Pagination, Dropdown, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DeleteConfirmationModal from './DeleteConfirmationModal';
import ExportSelectedCustomersModal from './ExportSelectedCustomersModal';
import ExportCustomersModal from './ExportCustomersModal';
import AppendModal from './AppendModal';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import AddEditLocationModal from './AddEditLocationModal';

class Customers extends Component {
    state = {

    }

    render() {
        console.log({ 'PROPS': this.props });

        return (
            <Segment>
                <Container fluid>
                    <Grid stackable divided="vertically" container padded>

                        <Grid.Row columns={16}>
                            <Grid.Column width={10}>
                                <Header content="Customers" subheader="Manage all the ict platform customers from here." />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Button.Group floated='right'>
                                    <Button>Append</Button>
                                    <Button.Or />
                                    <Button primary>Export</Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={4}>
                                {/* <Search fluid input={{ icon: 'search', iconPosition: 'right' }} placeholder="Search Customers" /> */}
                                <Input list='customers' style={{ float: 'left', display: 'inline-block' }} iconPosition='left' loading={false} icon='search' placeholder='Search Customers' />
                                <datalist id='customers'>
                                    <option value='Cus1'>Cus1</option>
                                    <option value='Cus2'>Cus2</option>
                                    <option value='Cus3'>Cus3</option>
                                </datalist>
                            </Grid.Column>
                            <Grid.Column width={12} textAlign="right">
                                <Button as='div' labelPosition='right'>
                                    <Button primary icon>
                                        <Icon name='add' /> Add Customer </Button>
                                    <Label as='a' basic pointing='left'>
                                        Total {235}
                                    </Label>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={9}>
                                <Header>
                                    List of Customers
                                    <small> (recent)</small>
                                    <small as='h6' style={{ float: 'right' }}>1/2 Page of 40 Results</small>
                                    <small><Dropdown disabled={false} simple item text=' ' placeholder=' ' scrolling options={[{ key: 'Delete Selected', text: 'Delete Selected', value: 'Delete Selected' }, { key: 'Export Selected', text: 'Export Selected', value: 'Export Selected' }]} /></small>
                                </Header>
                                <hr />

                                {
                                (!this.props.firestore.ordered.customers)?
                                "Loading"
                                :
                                "Available"
                                }

                                <List relaxed divided celled className='optionList'>
                                    <List.Item className='optionListItem'>
                                        <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                            <Button.Group size='tiny'>
                                                <Button animated='fade'>
                                                    <Button.Content hidden style={{ color: 'red' }}>
                                                        Delete
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='trash' />
                                                    </Button.Content>
                                                </Button>
                                                <Button animated='fade'>
                                                    <Button.Content hidden style={{ color: '#e65800' }}>
                                                        Edit
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='pencil' />
                                                    </Button.Content>
                                                </Button>
                                                <Button animated='fade' color='blue'>
                                                    <Button.Content hidden>
                                                        Expand
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='arrow right' />
                                                    </Button.Content>
                                                </Button>
                                            </Button.Group>
                                        </List.Content>
                                        <List.Icon name="user" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>
                                                <Checkbox label="Customer Name" />
                                            </List.Header>
                                            <List.Description>Added: Added date | Branches: No. Branches</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>

                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={1}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={1}
                                    totalPages={10}
                                    secondary
                                />
                                <Popup content="Items per load" trigger={
                                    <Dropdown style={{ float: 'right' }} compact selection defaultValue={20} options={[{ key: 20, text: '20', value: 20 }, { key: 50, text: '50', value: 50 }, { key: 100, text: '100', value: 100 }]} />
                                } />

                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        <Message.Header>No customers to show</Message.Header>
                                        Please wait while fetching or search for customers
                                    </Message.Content>
                                </Message>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Header>Customer Locations <small>(all)</small><small style={{ float: 'right' }}><Button disabled size='small' simple style={{ backgroundColor: 'white', color: '#398CCB' }} icon circular><Icon name='add' /> Add</Button></small></Header><hr />


                                <List relaxed divided celled className='optionList'>
                                    <List.Item className='optionListItem'>
                                        <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                            <Button.Group size='tiny'>
                                                <Button animated='fade'>
                                                    <Button.Content hidden style={{ color: 'red' }}>
                                                        Delete
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='trash' />
                                                    </Button.Content>
                                                </Button>
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
                                            <List.Header>Location Name</List.Header>
                                            <List.Description>
                                                Address: { }<br />
                                                Phone: { } (Contact Person)<br />
                                                Email: { }
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>

                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        <Message.Header>No locations to show</Message.Header>
                                        Select one of list from customers
                                    </Message.Content>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Message icon>
                                <Icon name='info circle' />
                                <Header as='h4'>
                                    Did you know?
                                    <Header.Subheader>You can generate various reports under customers section using the left panel.</Header.Subheader>
                                </Header>
                            </Message>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={16}>
                                <center>Modals: <br /></center>
                                <AppendModal dismissable={false} />
                                <ExportSelectedCustomersModal dataType="Export Customers & Locations" trigger="Selected Export" description="Do you need to export selected customers and their locations?" />
                                <AddCustomerModal trigger="Add Customer" dismissable={false} />
                                <AddEditLocationModal dataType="Add New Location" trigger="Add Location" dismissable={false} />
                                <DeleteConfirmationModal dataType="Customer" trigger="Delete Customer" dismissable={false} description="Delete [XXX] customer" />
                                <EditCustomerModal dataType="Edit Customer" trigger="Edit Customer" dismissable={false} /><hr />
                                <DeleteConfirmationModal dataType="Location" trigger="Delete Location" dismissable={false} description="Delete [XXX] location from [XXX] customer" />
                                <AddEditLocationModal dataType="Edit Location" trigger="Edit Location" dismissable={false} />
                                <DeleteConfirmationModal dataType="Selected Customers" trigger="Delete Selected" dismissable={false} description="Delete [XXX,XXX] customers" />
                                <ExportCustomersModal dataType="Export Customers & Locations" trigger="Bulk Export" description="Do you need to export all the customers and their locations in the system?" />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
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
    connect(mstp, null),
)(Customers);