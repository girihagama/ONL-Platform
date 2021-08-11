import React, { Component } from 'react';
import { Container, Segment, Grid, List, Header, Input, Button, Icon, Label, Message, Checkbox, Pagination, Dropdown, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import shortid from 'shortid';
import md5 from 'md5';
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment';

import DeleteConfirmationModal from './DeleteConfirmationModal';
import ExportSelectedCustomersModal from './ExportSelectedCustomersModal';
import ExportCustomersModal from './ExportCustomersModal';
import AppendModal from './AppendModal';
import AddCustomerSimplifiedModal from './AddCustomerSimplifiedModal';
import EditCustomerModal from './EditCustomerModal';
import AddEditLocationModal from './AddEditLocationModal';

import BranchCountSub from './BranchCountSub';
import ContactNumbersSub from './ContactNumbersSub';
import BranchListSub from './BranchListSub';
import SearchCustomer from './SearchCustomer';
import CustomerListSub from './Customer_List/CustomerListSub';

import { addCustomer, addLocation, editCustomer, editLocation, deleteCustomer, deleteLocation, customerSearch } from '../../../../store/actions/customerActions';

class Customers extends Component {
    state = {
        expandedCustomer: null,
        expandedCustomerName: null,
        selectedCustomers: {},
        searchKeyword: null,
        searchResults: []
    }

    handleCheck = (id, checked) => {
        //console.log(id, this.state.selectedCustomers.indexOf(id));
        var selected = this.state.selectedCustomers;
        var obj = {
            ...selected,
            [id]: checked
        }
        Object.entries(obj).map(([key, value], index) => {
            if (value == false) {
                delete obj[key];
            }
        });
        this.setState({ selectedCustomers: obj });
    }

    searchResults = (results) => {
        this.setState({ searchResults: results });
    }

    searchSelectCustomer = (expandedCustomer, expandedCustomerName) => {
        this.setState({ expandedCustomer, expandedCustomerName });
    }

    addCustomer = (params) => {
        console.log("Add Customer", params[0]);
        this.props.addCustomer(params[0]);
    }

    deleteCustomer = (params) => {
        console.log("Delete Customer", params[0]);
        this.setState({ expandedCustomer: null, expandedCustomerName: null });
        this.props.deleteCustomer(params[0]);
    }

    deleteLocation = (params) => {
        console.log("Delete Location", "Customer " + params[0], "Location " + params[1]);
        this.props.deleteLocation(params[0], params[1]);
    }

    deleteSelected = () => {
        console.log("Delete Selected", this.state.selectedCustomers);
    }

    editCustomer = (params) => {
        console.log("Customer Updated!", params);
        this.props.editCustomer(params[0], params[1]);
    }

    render() {
        console.log({ 'PROPS': this.props }, { 'STATE': this.state }, this.state.searchResults.length);
        //console.log(md5(shortid.generate()), timeAgo.format(new Date()));

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
                                    <AppendModal dismissable={false} triggerElement={<Button>Append</Button>} />
                                    <Button.Or />
                                    <ExportCustomersModal dataType="Export Customers & Locations" triggerElement={<Button primary>Export</Button>} trigger="Bulk Export" description="Do you need to export all the customers and their locations in the system?" />
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={6}>
                                <SearchCustomer functions={[this.searchSelectCustomer, this.searchResults]} />
                            </Grid.Column>
                            <Grid.Column width={10} textAlign="right">
                                <Button as='div' labelPosition='right'>
                                    <AddCustomerSimplifiedModal triggerElement={<Button primary icon><Icon name='add' /> Add Customer</Button>} trigger="Add New Customer" dismissable={false} functions={[this.addCustomer]} />
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
                                    <small as='h6' style={{ float: 'right' }}>1/1 Page of 10 Results</small>
                                    <small><Dropdown disabled={false} simple item text=' ' placeholder=' ' scrolling options={[{ key: 'Delete Selected', text: 'Delete Selected', value: 'Delete Selected' }, { key: 'Export Selected', text: 'Export Selected', value: 'Export Selected' }]} /></small>
                                </Header>
                                <hr />

                                {
                                    (!this.props.firestore.ordered.customers)
                                        ? //no customers available or waiting for fetch
                                        <Message icon>
                                            <Icon name='circle notched' loading />
                                            <Message.Content>
                                                <Message.Header>No customers to show</Message.Header>
                                                Please wait while fetching or search for customers
                                            </Message.Content>
                                        </Message>
                                        : //customer records available
                                        <div>
                                            {/* <CustomerListSub /> */}

                                            <List relaxed divided celled className={['optionList']}>
                                                {
                                                    (this.state.searchResults.length > 0)
                                                        ? // when search results available
                                                        (this.state.searchResults).map((item, index) => {
                                                            return (
                                                                <List.Item className='optionListItem' key={item.id}>
                                                                    <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                                                        <Button.Group size='tiny'>
                                                                            <DeleteConfirmationModal triggerElement={<Button animated='fade'>
                                                                                {/* <Button.Content hidden style={{ color: 'red' }}>
                                                                                Delete
                                                                            </Button.Content> */}
                                                                                <Button.Content hidden style={{ color: 'red' }}>Delete</Button.Content>
                                                                                <Button.Content visible>
                                                                                    <Icon name='trash' />
                                                                                </Button.Content>
                                                                            </Button>} function={this.deleteCustomer} functionParams={[item.id]} dataType="Customer" trigger="Delete Customer" dismissable={false} description={"Delete [" + item.customerName + "] customer"} />
                                                                            <EditCustomerModal function={this.editCustomer} functionParams={[item.id, item.customerName]} dataType="Edit Customer" trigger="Edit Customer" dismissable={false} triggerElement={<Button animated='fade'>
                                                                                <Button.Content hidden style={{ color: '#e65800' }}>
                                                                                    Edit
                                                                                </Button.Content>
                                                                                <Button.Content visible>
                                                                                    <Icon name='pencil' />
                                                                                </Button.Content>
                                                                            </Button>} />
                                                                            <Button animated='fade' color='blue' onClick={() => { this.setState({ expandedCustomer: item.id, expandedCustomerName: item.customerName }) }}>
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
                                                                            <Checkbox key={item.id} onChange={(e, value) => this.handleCheck(item.id, value.checked)} label={(item.customerName) ? item.customerName : "N/A"} />
                                                                        </List.Header>
                                                                        <List.Description style={{ marginTop: '5px' }}>
                                                                            <Label>
                                                                                <Icon name='save' />
                                                                                Created On : {new Date(moment(item.createdDate, "YYYY-MM-DD hh:mm:ss")).toDateString()}
                                                                            </Label>
                                                                            <Label>{(!item.createdDate) ? "N/A" : <ReactTimeAgo date={new Date(moment(item.createdDate, "YYYY-MM-DD hh:mm:ss"))} locale="en-SL" />}</Label>
                                                                            {/* <BranchCountSub doc={item.id} /> */}
                                                                        </List.Description>
                                                                    </List.Content>
                                                                </List.Item>
                                                            )
                                                        })
                                                        : // when search results are not available
                                                        (this.props.firestore.ordered.customers).map((item, index) => {
                                                            return (
                                                                <List.Item className='optionListItem' key={item.id}>
                                                                    <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                                                        <Button.Group size='tiny'>
                                                                            <DeleteConfirmationModal triggerElement={<Button animated='fade'>
                                                                                {/* <Button.Content hidden style={{ color: 'red' }}>
                                                                                Delete
                                                                            </Button.Content> */}
                                                                                <Button.Content hidden style={{ color: 'red' }}>Delete</Button.Content>
                                                                                <Button.Content visible>
                                                                                    <Icon name='trash' />
                                                                                </Button.Content>
                                                                            </Button>} function={this.deleteCustomer} functionParams={[item.id]} dataType="Customer" trigger="Delete Customer" dismissable={false} description={"Delete [" + item.customerName + "] customer"} />
                                                                            <EditCustomerModal function={this.editCustomer} functionParams={[item.id, item.customerName]} dataType="Edit Customer" trigger="Edit Customer" dismissable={false} triggerElement={<Button animated='fade'>
                                                                                <Button.Content hidden style={{ color: '#e65800' }}>
                                                                                    Edit
                                                                                </Button.Content>
                                                                                <Button.Content visible>
                                                                                    <Icon name='pencil' />
                                                                                </Button.Content>
                                                                            </Button>} />
                                                                            <Button animated='fade' color='blue' onClick={() => { this.setState({ expandedCustomer: item.id, expandedCustomerName: item.customerName }) }}>
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
                                                                            <Checkbox key={item.id} onChange={(e, value) => this.handleCheck(item.id, value.checked)} label={(item.customerName) ? item.customerName : "N/A"} />
                                                                        </List.Header>
                                                                        <List.Description style={{ marginTop: '5px' }}>
                                                                            <Label>
                                                                                <Icon name='save' />
                                                                                Created On : {new Date(moment(item.createdDate, "YYYY-MM-DD hh:mm:ss")).toDateString()}
                                                                            </Label>
                                                                            <Label>{(!item.createdDate) ? "N/A" : <ReactTimeAgo date={new Date(moment(item.createdDate, "YYYY-MM-DD hh:mm:ss"))} locale="en-SL" />}</Label>
                                                                            {/* <BranchCountSub doc={item.id} /> */}
                                                                        </List.Description>
                                                                    </List.Content>
                                                                </List.Item>
                                                            )
                                                        })
                                                }
                                            </List>

                                            {/* <Pagination                                                
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
                                            } /> */}

                                        </div>
                                }
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Header>Customer Locations
                                    {(this.state.expandedCustomerName) ? <small> ({this.state.expandedCustomerName})</small> : ""}
                                    <small style={{ float: 'right' }}>
                                        <AddEditLocationModal customer={[this.state.expandedCustomer, this.state.expandedCustomerName]} dataType="Add Location" mode="add" function={{ addLocation: this.props.addLocation }} trigger="Add Location" dismissable={false} triggerElement={
                                            <Button size='small' disabled={(!this.state.expandedCustomer)} simple style={{ backgroundColor: 'white', color: '#398CCB' }} icon circular><Icon name='add' /> Add</Button>}
                                        />
                                    </small></Header><hr />
                                {
                                    (!this.state.expandedCustomer)
                                        ?
                                        <Message icon>
                                            <Icon name='circle notched' loading />
                                            <Message.Content>
                                                <Message.Header>No locations to show</Message.Header>
                                                Select one of list from customers
                                            </Message.Content>
                                        </Message>
                                        :
                                        <div>
                                            <BranchListSub function={{ deleteLocation: this.deleteLocation, editLocation: this.props.editLocation }} functionParams={[this.state.expandedCustomer, this.state.expandedCustomerName]} doc={this.state.expandedCustomer} />
                                        </div>
                                }
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
                                {/* <AppendModal dismissable={false} triggerElement={<Button disabled>Delete Customer</Button>}/> */}
                                <ExportSelectedCustomersModal dataType="Export Customers & Locations" trigger="Selected Export" description="Do you need to export selected customers and their locations?" />
                                {/* <AddCustomerModal trigger="Add Customer" dismissable={false} /> */}
                                {/* <AddEditLocationModal customerName="Hello Inc." dataType="Add New Location" mode="add" function={this.addLocation} trigger="Add Location" dismissable={false} /> */}
                                {/* <DeleteConfirmationModal triggerElement={<Button disabled>Delete Customer</Button>} function={this.deleteCustomer} functionParams={["WnmG36Fo0KPbO0BrdDxR"]} dataType="Customer" trigger="Delete Customer" dismissable={false} description="Delete [XXX] customer" /> */}
                                {/* <EditCustomerModal triggerElement={<Button disabled>Edit Customer</Button>} dataType="Edit Customer" trigger="Edit Customer" dismissable={false} /><hr /> */}
                                {/* <DeleteConfirmationModal triggerElement={<Button disabled>Delete Location</Button>} dataType="Location" function={this.deleteLocation} functionParams={["UYbCFcIy2FXAiKjNcHN6", "LzaQl4NMhKYzcsAH93yz"]} trigger="Delete Location" dismissable={false} description="Delete [XXX] location from [XXX] customer" /> */}
                                {/* <AddEditLocationModal customerName="Hello Inc." dataType="Edit Location" mode="edit" trigger="Edit Location" dismissable={false} /> */}
                                <DeleteConfirmationModal triggerElement={<Button>Delete Selected</Button>} dataType="Selected Customers" trigger="Delete Selected" dismissable={false} description="Delete [XXX,XXX] customers" />
                                {/* <ExportCustomersModal dataType="Export Customers & Locations" trigger="Bulk Export" description="Do you need to export all the customers and their locations in the system?" /> */}
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

const mdtp = (dispatch) => {
    return {
        addCustomer: (customerData) => dispatch(addCustomer(customerData)),
        addLocation: (customerId, locationData) => dispatch(addLocation(customerId, locationData)),
        editCustomer: (customerId, customerData) => dispatch(editCustomer(customerId, customerData)),
        editLocation: (customerId, locationId, locationData) => dispatch(editLocation(customerId, locationId, locationData)),
        deleteCustomer: (customerId) => dispatch(deleteCustomer(customerId)),
        deleteLocation: (customerId, locationId) => dispatch(deleteLocation(customerId, locationId)),
        customerSearch: (keyword) => dispatch(customerSearch(keyword)),
    }
}

export default compose(
    firestoreConnect(
        (props) => [
            { collection: 'customers', orderBy: ["createdDate", "desc"], limit: 10, startAfter: "" },
        ]
    ),
    connect(mstp, mdtp)
)(Customers);