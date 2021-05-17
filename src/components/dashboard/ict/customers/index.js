import React, { Component } from 'react';
import { Container, Segment, Grid, List, Header, Search, Button, Icon, Label } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Customers extends Component {
    render() {
        console.log('PROPS', this.props);

        return (
            <Segment>
                <Container fluid>
                    <Grid stackable divided="vertically" container padded>

                        <Grid.Row columns={16}>
                            <Grid.Column width={16}>
                                <Header content="Customers" subheader="Manage all the ict platform customers from here." />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={11}>
                                <Search fluid input={{ icon: 'search', iconPosition: 'right' }} placeholder="Search Customers" />
                            </Grid.Column>
                            <Grid.Column width={5} textAlign='right'>
                                <Button as='div' labelPosition='right'>
                                    <Button primary icon>
                                        <Icon name='add' /> Add New</Button>
                                    <Label as='a' basic pointing='left'>
                                        235 Total Customers
                                    </Label>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={9}>
                                <Header>List of Customers <small>(recent)</small><small as='h6' style={{ float: 'right' }}>1/1 Page of 235 Results </small></Header><hr />
                                <List relaxed divided celled>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Button.Group size='tiny'>
                                                <Button animated>
                                                    <Button.Content hidden>
                                                        Delete
                                                </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='trash' />
                                                    </Button.Content>
                                                </Button>
                                                <Button animated>
                                                    <Button.Content hidden>
                                                        Edit
                                                </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='pencil' />
                                                    </Button.Content>
                                                </Button>
                                                <Button animated color='blue'>
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
                                            <List.Header>Customer Name</List.Header>
                                            <List.Description>Added: Added date | Branches: No. Branches</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name="user" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>Customer Name</List.Header>
                                            <List.Description>Added: Added date | Branches: No. Branches</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Header>Customer Locations <small>(all)</small><small as='h6' style={{ float: 'right' }}>Total 6 Results </small></Header><hr />
                                <List relaxed divided celled>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Button.Group size='tiny'>
                                                <Button animated>
                                                    <Button.Content hidden>
                                                        Delete
                                                </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='trash' />
                                                    </Button.Content>
                                                </Button>
                                                <Button animated>
                                                    <Button.Content hidden>
                                                        Edit
                                                </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='pencil' />
                                                    </Button.Content>
                                                </Button>
                                            </Button.Group>
                                        </List.Content>
                                        <List.Icon name="user" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>Location Name</List.Header>
                                            <List.Description>
                                                Address: { }<br />
                                                Phone: { } (Contact Person)<br />
                                                Email: { }
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name="user" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>Customer Name</List.Header>
                                            <List.Description>Added: Added date | Branches: No. Branches</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={16}>
                            c
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