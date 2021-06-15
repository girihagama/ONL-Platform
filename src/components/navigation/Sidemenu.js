import React, { Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';

class Sidemenu extends Component {
    render() {
        return (
            <Menu vertical>
                <Menu.Item><b>Quick Links</b></Menu.Item>

                <Menu.Item>
                    <Menu.Header>User</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='Profile'
                        //active={activeItem === 'enterprise'}
                        //onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>System</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='About'
                        //active={activeItem === 'enterprise'}
                        //onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>General</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='Import'
                        //active={activeItem === 'enterprise'}
                        //onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Export'
                        //active={activeItem === 'consumer'}
                        //onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Licence</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='View'
                        //active={activeItem === 'enterprise'}
                        //onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Update'
                        //active={activeItem === 'enterprise'}
                        //onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                    <Menu.Item>
                        © Copyright<br />
                        <a href="mailto:indunil.tharanga.priyadarshana@gmail.com">Indunil Girihagama</a> - {new Date().getFullYear()}<br />
                    All Rights Reserved
                    </Menu.Item>
            </Menu>
        );
    }
}

export default Sidemenu;