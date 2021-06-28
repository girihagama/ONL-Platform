import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Popup, Input } from 'semantic-ui-react';

class ExportCustomersModal extends Component {
    state = {
        appendModal: false,
        formData: {
            customerId: (!this.props.functionParams) ? "" : this.props.functionParams[0],
            customerName: (!this.props.functionParams) ? "" : this.props.functionParams[1]
        },
        formErrors: {
            customerName: null
        }
    };

    handleUpdate = () => {
        if (this.state.formData.customerName !== "") {
            this.props.function([this.state.formData.customerId, this.state.formData.customerName]);
            this.setState({ appendModal: false });
        } else {
            var formErrors = { customerName: true }
            this.setState({ formErrors });
        }
    }

    render() {
        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='mini'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={this.props.triggerElement}
            >
                <Header>
                    {this.props.dataType}
                    <Header.Subheader>{(!this.props.functionParams) ? "Customer Name" : this.props.functionParams[1]}</Header.Subheader>
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
                    <Button color='green' inverted onClick={this.handleUpdate}>
                        <Icon name='checkmark' /> Update
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default ExportCustomersModal;