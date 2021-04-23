import React, { Component } from 'react';
import { Input, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item>
                    <Link to='/'><Image src='/logo.png' style={{ width: '70px' }} /></Link>
                </Menu.Item>

                <Menu.Item
                    name='Dashboard'
                    active={true}
                >
                    <Link to='/ict/dashboard'>Dashboard</Link>
                </Menu.Item>
                <Menu.Item
                    name='Customers'
                >
                    <Link to='/ict/customers'>Customers</Link>
                </Menu.Item>
                <Menu.Item
                    name='Products'
                >
                    <Link to='/ict/products'>Products</Link>
                </Menu.Item>
                <Menu.Item
                    name='Invoices'
                >
                    <Link to='/ict/invoices'>Invoices</Link>
                </Menu.Item>
                <Menu.Item
                    name='AMCs'
                >
                    <Link to='/ict/amcs'>AMCs</Link>
                </Menu.Item>
                <Menu.Item
                    name='Repairs'
                >
                    <Link to='/ict/repairs'>Repairs</Link>
                </Menu.Item>
                
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
                        <Header size='small'><Link to='/'>Logout</Link></Header>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navbar;