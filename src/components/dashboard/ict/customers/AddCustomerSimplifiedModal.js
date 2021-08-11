import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Popup, Input } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';

class AddCustomerSimplifiedModal extends Component {
    validator = new SimpleReactValidator();

    state = {
        appendModal: false,
        formData: {
            customerName: ""
        },
        formErrors: {
            customerName: null
        }
    };

    handleUpdate = () => {
        if (this.state.formData.customerName !== "") {
            this.props.functions[0]([this.state.formData.customerName]);
            var formData = {
                customerName: ""
            }
            this.setState({ formData, appendModal: false });
        } else {
            var formErrors = { customerName: true }
            this.setState({ formErrors });
        }
    }

    handleSubmit = () => {
        if (this.validator.allValid()) {
            //alert('You submitted the form and stuff!');
            this.props.functions[0]([this.state.formData.customerName]);
            var formData = {
                customerName: ""
            }
            this.setState({ formData, appendModal: false });
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
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
                    <Header.Subheader>{this.props.trigger}</Header.Subheader>
                </Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Customer Name *</label>
                            <Popup content='Required field' position="bottom left" trigger={
                                <Input name="customerName" error={this.state.formErrors.customerName} required value={this.state.formData.customerName} placeholder='Enter name of the customer' autoFocus
                                    onChange={(e) => { (e.target.value == 0) ? this.state.formErrors.customerName = true : this.state.formErrors.customerName = false; var field = { ...this.state.formData }; field.customerName = e.target.value; this.setState({ formData: field }) }}
                                />
                            }
                            />
                            {this.validator.message('customerName', this.state.formData.customerName, 'required')}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={this.handleSubmit}>
                        <Icon name='checkmark' /> Insert
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default AddCustomerSimplifiedModal;