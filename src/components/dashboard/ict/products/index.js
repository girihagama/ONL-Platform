import React, { Component } from 'react';
import { Container, Segment, Grid, List, Header, Input, Button, Icon, Label, Message, Checkbox, Pagination, Dropdown, Popup, Menu, Loader, Dimmer, Confirm } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Customers extends Component {
    state = {
        confirmShow: false
    };

    render() {
        console.log('PROPS', this.props);

        return (
            <Segment>
                <Container fluid>
                    <Grid stackable divided="vertically" container padded>

                        <Grid.Row columns={16}>
                            <Grid.Column width={10}>
                                <Header content="Products" subheader="Manage all the ict platform products from here." />
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
                                <Input list='products' style={{ float: 'left', display: 'inline-block' }} iconPosition='left' loading={false} icon='search' placeholder='Search Products' />
                                <datalist id='products'>
                                    <option value='Prod1'>Prod1</option>
                                    <option value='Prod2'>Prod2</option>
                                    <option value='Prod3'>Prod3</option>
                                </datalist>
                            </Grid.Column>
                            <Grid.Column width={12} textAlign="right">
                                <Button as='div' labelPosition='right'>
                                    <Button primary icon>
                                        <Icon name='add' /> Add Product </Button>
                                    <Label as='a' basic pointing='left'>
                                        Total {130}
                                    </Label>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={9}>
                                <Header>
                                    List of Products
                                    <small> (recent)</small>
                                    <small as='h6' style={{ float: 'right' }}>1/1 Page of 50 Results</small>
                                    <small><Dropdown disabled={false} simple item text=' ' placeholder=' ' scrolling options={[{ key: 'Delete Selected', text: 'Delete Selected', value: 'Delete Selected' }, { key: 'Export Selected', text: 'Export Selected', value: 'Export Selected' }]} /></small>
                                </Header>
                                <hr />

                                <List relaxed divided celled className='optionList'>
                                    <List.Item className='optionListItem'>
                                        <List.Content floated='right' className='optionItems' style={{ display: 'none' }}>
                                            <Button.Group size='tiny'>
                                                <Confirm
                                                    open={this.state.confirmShow}
                                                    size='mini'
                                                    closeOnEscape={false}
                                                    closeOnDimmerClick={false}
                                                    trigger={<Button onClick={() => this.setState({ confirmShow: true })}>Confirm</Button>}
                                                    content={'Confirm Action?'}
                                                    onCancel={() => { this.setState({ confirmShow: false }); alert('cancelled'); }}
                                                    onConfirm={() => { this.setState({ confirmShow: false }); alert('confirmed'); }}
                                                />
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
                                                        View
                                                </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='eye' />
                                                    </Button.Content>
                                                </Button>
                                            </Button.Group>
                                        </List.Content>
                                        <List.Icon name="box" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>
                                                <Checkbox label="Product Name" />
                                            </List.Header>
                                            <List.Description>Added: Added date | Category: Product category</List.Description>
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
                                    <Dropdown style={{ float: 'right' }} compact selection defaultValue={50} options={[{ key: 20, text: '20', value: 20 }, { key: 50, text: '50', value: 50 }, { key: 100, text: '100', value: 100 }]} />
                                } />

                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        <Message.Header>No products to show</Message.Header>
                                        Please wait while fetching or search for products
                                    </Message.Content>
                                </Message>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Header>Product Categories <small>(all)</small><small style={{ float: 'right' }}><Button disabled size='small' simple style={{ backgroundColor: 'white', color: '#398CCB' }} icon circular><Icon name='add' /> Add</Button></small></Header><hr />


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
                                        <List.Icon name="clone" size='large' verticalAlign="middle" />
                                        <List.Content>
                                            <List.Header>Category Name</List.Header>
                                            <List.Description>
                                                Added On: { }<br />
                                                Sub Categories: { }
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>

                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        <Message.Header>No categories to show</Message.Header>
                                        Please wait while we are fetiching data
                                    </Message.Content>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Message icon>
                                <Icon name='info circle' />
                                <Header as='h4'>
                                    Did you know?
                                    <Header.Subheader>You can generate various reports under products section using the left panel.</Header.Subheader>
                                </Header>
                            </Message>
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