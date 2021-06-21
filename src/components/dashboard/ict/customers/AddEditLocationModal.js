import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Popup, Input } from 'semantic-ui-react';

class ExportCustomersModal extends Component {
    state = {
        appendModal: false,
    };

    render() {
        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='large'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={<Button>{this.props.trigger}</Button>}
            >
                <Header>
                    {this.props.dataType}
                    <Header.Subheader>Customer Name</Header.Subheader>
                </Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Location Name *</label>
                                <input required placeholder='Enter a name for the location' autoFocus
                                    onChange={(e) => { }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <input type='email' placeholder='Enter an email address'
                                    onChange={(e) => { }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Address *</label>
                            <input required placeholder='Enter an address for the location'
                                onChange={(e) => { }}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Contact Person *</label>
                                <input required placeholder='Enter the name of contact person'
                                    onChange={(e) => { }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Contact Number *</label>
                                <input type='number' required placeholder='Enter a contact number'
                                    onChange={(e) => { }}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='checkmark' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default ExportCustomersModal;