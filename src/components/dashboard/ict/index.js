import React, { Component } from 'react';
import { Container, Grid, Menu, Label } from 'semantic-ui-react';
import Navbar from '../../navigation/Navbar';
import Sidemenu from '../../navigation/Sidemenu';
import Summary from '../../dashboard/ict/summary';
import Customers from '../../dashboard/ict/customers';
import Products from '../../dashboard/ict/products';
import Invoices from '../../dashboard/ict/invoices';
import AMCs from '../../dashboard/ict/amcs';
import Repairs from '../../dashboard/ict/repairs';
import { Route, Switch, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class ICT_Dashboard extends Component {
    render() {
        console.log("Dashboard", { state: this.state, props: this.props });

        return (
            <Container fluid className="gradient1"> {/*style={{ backgroundColor: '#F7F7F7', backgroundImage: 'url("https://picsum.photos/1920/1080?blur=2")', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundPosition: 'center center', backgroundSize: 'cover' }}*/}
                <Grid padded stackable>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Navbar navigation={this.props.firestore.data.navigation} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            
                            <Route exact path='/ict/dashboard'>
                                <Menu vertical>                                    
                                    <Menu.Item disabled> <Label style={{marginRight:'-1px'}} as='a' attached='top right' color='red' size='small'>Coming Soon</Label>
                                        <Menu.Header>Notifications</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='open'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='send message'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            
                            <Route exact path='/ict/customers'>
                                <Menu vertical>
                                    <Menu.Item><b>Customer</b></Menu.Item>
                                    <Menu.Item disabled> <Label style={{marginRight:'-1px',marginTop:'1px'}} as='a' attached='top right' color='red' size='small'>Coming Soon</Label>
                                        <Menu.Header>Reports</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='report type 1'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='report type 2'
                                            //active={activeItem === 'consumer'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route exact path='/ict/products'>
                                <Menu vertical>
                                    <Menu.Item><b>Product</b></Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>Reports</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='report type 1'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='report type 2'
                                            //active={activeItem === 'consumer'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route exact path='/ict/invoices'>
                                <Menu vertical>
                                    <Menu.Item><b>Invoice</b></Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>Reports</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='report type 1'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='report type 2'
                                            //active={activeItem === 'consumer'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route exact path='/ict/amcs'>
                                <Menu vertical>
                                    <Menu.Item><b>AMC</b></Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>Reports</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='report type 1'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='report type 2'
                                            //active={activeItem === 'consumer'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route exact path='/ict/repairs'>
                                <Menu vertical>
                                    <Menu.Item><b>Repair</b></Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>Reports</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item
                                                name='report type 1'
                                            //active={activeItem === 'enterprise'}
                                            //onClick={this.handleItemClick}
                                            />
                                            <Menu.Item
                                                name='report type 2'
                                            //active={activeItem === 'consumer'}
                                            //onClick={this.handleItemClick}
                                            />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Route>

                            <Sidemenu />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            {/* Import Sub Sections */}
                            <Switch>
                                <Route exact path='/ict/dashboard' component={Summary} />
                                <Route exact path='/ict/customers' component={Customers} />
                                <Route exact path='/ict/products' component={Products} />
                                <Route exact path='/ict/invoices' component={Invoices} />
                                <Route exact path='/ict/amcs' component={AMCs} />
                                <Route exact path='/ict/repairs' component={Repairs} />
                                <Route exact path='/ict/*'>
                                    <Redirect to='/ict/dashboard' />
                                </Route>
                            </Switch>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
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
        { collection: 'navigation', doc: 'ict' },    
    ]),
    connect(mstp, null),
)(ICT_Dashboard);