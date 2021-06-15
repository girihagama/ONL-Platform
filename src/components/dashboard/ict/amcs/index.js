import React, { Component } from 'react';
import { Container, Segment, Grid, List, Header, Input, Button, Icon, Label, Message, Checkbox, Pagination, Dropdown, Popup, Table, Loader, Dimmer, Confirm } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Customers extends Component {
    state = {
        confirmShow: false
    };

    render() {
        console.log('PROPS', this.props);
        const tableData = [
            { amcNo: 'AMC-3695623', issueDate: '2021-01-01', period: '12', customerName: 'Customer', productCount: 15 },
        ]

        return (
            <Segment>
                <Container fluid>
                    <Grid stackable divided="vertically" container padded>

                        <Grid.Row columns={16}>
                            <Grid.Column width={10}>
                                <Header content="AMCs" subheader="Manage all the ict platform AMCs from here." />
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
                                <Input list='amcs' style={{ float: 'left', display: 'inline-block' }} iconPosition='left' loading={false} icon='search' placeholder='Search AMCs' />
                                <datalist id='amcs'>
                                    <option value='AMC1'>AMC1</option>
                                    <option value='AMC2'>AMC2</option>
                                    <option value='AMC3'>AMC3</option>
                                </datalist>
                            </Grid.Column>
                            <Grid.Column width={12} textAlign="right">
                                <Button as='div' labelPosition='right'>
                                    <Button primary icon>
                                        <Icon name='add' /> Add AMC </Button>
                                    <Label as='a' basic pointing='left'>
                                        Total {1270}
                                    </Label>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Grid.Column width={16}>
                                <Header>
                                    List of AMCs
                                    <small> (recent)</small>
                                    <small as='h6' style={{ float: 'right' }}>1/10 Page of 100 Results</small>
                                    <small><Dropdown disabled={false} simple item text=' ' placeholder=' ' scrolling options={[{ key: 'Delete Selected', text: 'Delete Selected', value: 'Delete Selected' }, { key: 'Export Selected', text: 'Export Selected', value: 'Export Selected' }]} /></small>
                                </Header>
                                <hr />

                                <Table sortable celled definition selectable striped>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell />
                                            <Table.HeaderCell >
                                                Multiselect
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                AMC Number
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                Issue Date
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                Period (Months)
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                Customer
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                Products
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                            >
                                                Options
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {tableData.map((data, index) => (
                                            <Table.Row key={data.invoiceNo}>
                                                <Table.Cell>{index + 1}]</Table.Cell>
                                                <Table.Cell collapsing><Checkbox slider /></Table.Cell>
                                                <Table.Cell>{data.amcNo}</Table.Cell>
                                                <Table.Cell collapsing>
                                                    {data.issueDate}<br />
                                                </Table.Cell>
                                                <Table.Cell>{data.period}</Table.Cell>
                                                <Table.Cell>{data.customerName}</Table.Cell>
                                                <Table.Cell>{data.productCount}</Table.Cell>
                                                <Table.Cell collapsing>
                                                    <Button.Group size='tiny' floated='right'>
                                                        {/* <Confirm
                                                        open={this.state.confirmShow}
                                                        size='mini'
                                                        closeOnEscape={false}
                                                        closeOnDimmerClick={false}
                                                        trigger={<Button onClick={() => this.setState({ confirmShow: true })}>Confirm</Button>}
                                                        content={'Confirm Action?'}
                                                        onCancel={() => { this.setState({ confirmShow: false }); alert('cancelled'); }}
                                                        onConfirm={() => { this.setState({ confirmShow: false }); alert('confirmed'); }}
                                                    /> */}
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
                                                        <Button>Products</Button>
                                                        <Dropdown
                                                            className='button icon'
                                                            options={[
                                                                { key: 'notes', icon: 'notes', text: 'Notes', value: 'notes' },
                                                            ]}
                                                            trigger={<></>}
                                                        />
                                                    </Button.Group>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>

                                <br />
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
                                        <Message.Header>No AMCs to show</Message.Header>
                                        Please wait while fetching or search for AMCs
                                    </Message.Content>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16}>
                            <Message icon>
                                <Icon name='info circle' />
                                <Header as='h4'>
                                    Did you know?
                                    <Header.Subheader>You can generate various reports under AMC section using the left panel.</Header.Subheader>
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