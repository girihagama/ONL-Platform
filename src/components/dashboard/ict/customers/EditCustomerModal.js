import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Popup, Input } from 'semantic-ui-react';

class ExportCustomersModal extends Component {
    state = {
        appendModal: false,
        formData: {
            customerName: ""
        },
        formErrors: {
            customerName: null
        }
    };

    render() {
        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='mini'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={<Button>{this.props.trigger}</Button>}
            >
                <Header>
                    {this.props.dataType}
                </Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>New Customer Name *</label>
                            <Popup content='Required field' position="bottom left" trigger={
                                <Input error={this.state.formErrors.customerName} required value={this.state.formData.customerName} placeholder='Enter new name for "Current name" customer' autoFocus
                                    onChange={(e) => { (e.target.value == 0) ? this.state.formErrors.customerName = true : this.state.formErrors.customerName = false; var field = { ...this.state.formData }; field.customerName = e.target.value; this.setState({ formData: field }) }}
                                />
                            }
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='checkmark' /> Update
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default ExportCustomersModal;