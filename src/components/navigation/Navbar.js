import React, { Component } from 'react';
import { Input, Menu, Image, Icon, Header, Dimmer, Loader, MenuItem } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

class Navbar extends Component {
    state = {
        ict: [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Customers", path: "/customers" },
            { name: "Products", path: "/products" },
            { name: "Invoices", path: "/invoices" },
            { name: "AMCs", path: "/amcs" },
            { name: "Repairs", path: "/repairs" }
        ]
    }

    platformURL = localStorage.getItem('platform');
    platformName = this.platformURL.substring(1);
    platformSC = this.state[this.platformName];


    render() {
        console.log("Navbar.js", { state: this.state, props: this.props });

        return (
            <Menu>
                <Menu.Item>
                    <Link to='/'><Image src='/logo.png' style={{ width: '70px' }} /></Link>
                </Menu.Item>

                {
                    this.platformSC.map((val, ind) => {
                        return (
                            <MenuItem key={ind}>
                                <Link to={this.platformURL + val.path}>{val.name}</Link>
                            </MenuItem>
                        )
                    })
                }

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Icon.Group size='big'>
                            <Icon fitted name='envelope' />
                            <Icon corner='top right' loading name='star' color='red' />
                        </Icon.Group>
                    </Menu.Item>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item>
                        <Header size='small'><a style={{ color: 'default', cursor: 'hand' }} onClick={this.props.signOut}>Logout</a></Header>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

const mdtp = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}


export default connect(null, mdtp)(Navbar);