import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
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
        console.log("Dashboard", { state: this.state, props:this.props });

        return (
            <Container fluid style={{ height: '100vh', width: '100vw', backgroundColor: '#F7F7F7' }}>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Navbar navigation={this.props.firestore.data.navigation}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
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
        { collection: 'navigation', doc: 'ict'}
    ]),
    connect(mstp,null),
)(ICT_Dashboard);