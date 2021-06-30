import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Step, Input, Popup, Label } from 'semantic-ui-react';

class AddCustomerModal extends Component {
    state = {
        showModal: false,
        activeStep: 0,
        steps: [
            {
                key: 'Customer',
                icon: 'user',
                active: true,
                disabled: true,
                title: 'Customer',
                description: 'Enter customer details',
                button: 'Next',
                completed: false
            },
            {
                key: 'Location',
                active: true,
                disabled: true,
                icon: 'map',
                title: 'Location',
                description: 'Enter primary location',
                button: 'Next',
                completed: false
            },
            {
                key: 'Review',
                active: true,
                disabled: true,
                title: 'Review',
                description: 'Review the inputs',
                button: 'Insert',
                icon: 'info'
            },
        ],
        formData: {
            customerName: "",
            location: {
                locationName: "",
                locationAddress: "",
                locationEmail: "",
                contact: [{
                    contactPerson: "",
                    contactNumber: ""
                }]
            }
        },
        formErrors: {
            customerName: false,
            locationName: false,
            locationAddress: false,
            contactPerson: false,
            contactNumber: false
        }
    };

    submitForm = () => {
        console.log("Submit", (this.validateForm()));
    }

    validateForm() {
        for (var key in this.state.formErrors) {
            if (this.state.formErrors.hasOwnProperty(key)) {
                //console.log(key + " -> " + this.state.formErrors[key]);
                if (this.state.formErrors[key] == true) {                    
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        //console.log(this.state);

        var totalSteps = 3
        for (var step = 0; step <= (totalSteps - 1); step++) {
            //console.log({ "Counter": step }, { "Active": this.state.activeStep });
            if (step == this.state.activeStep) {
                this.state.steps[step].disabled = false;
                this.state.steps[step].active = true;
                this.state.steps[step].completed = false;
            } else if (step < this.state.activeStep) {
                this.state.steps[step].disabled = false;
                this.state.steps[step].active = true;
                this.state.steps[step].completed = true;
            } else if (step > this.state.activeStep) {
                this.state.steps[step].disabled = true;
                this.state.steps[step].active = false;
                this.state.steps[step].completed = false;
            }
        }

        return (
            <Modal
                onClose={() => this.setState({ showModal: false })}
                onOpen={() => this.setState({ showModal: true })}
                open={this.state.showModal}
                size='small'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={<Button>{this.props.trigger}</Button>}
            >
                <Header>
                    Add Customer
                </Header>
                <Modal.Content>
                    <Step.Group size='small' fluid items={this.state.steps} />

                    <Form id="add-customer-form" name="add-customer-form">
                        {(this.state.activeStep == 0) ?
                            <div>
                                <Form.Field>
                                    <label>Customer Name *</label>
                                    <Popup content='Required field' position="bottom left" trigger={
                                        <Input error={this.state.formErrors.customerName} required value={this.state.formData.customerName} placeholder='Enter a name for the customer' autoFocus
                                            onChange={(e) => { (e.target.value == 0) ? this.state.formErrors.customerName = true : this.state.formErrors.customerName = false; var field = { ...this.state.formData }; field.customerName = e.target.value; this.setState({ formData: field }) }}
                                        />
                                    }
                                    />
                                </Form.Field>
                            </div>
                            : ""}

                        {(this.state.activeStep == 1) ?
                            <div>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Location Name *</label>
                                        <input required error={this.state.formErrors.locationName} value={this.state.formData.location.locationName} placeholder='Enter a name for the location' autoFocus
                                            onChange={(e) => { (e.target.value == 0) ? this.state.formErrors.locationName = true : this.state.formErrors.locationAddress = false; var field = { ...this.state.formData }; field.location.locationName = e.target.value; this.setState({ formData: field }) }}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input type='email' value={this.state.formData.location.locationEmail} placeholder='Enter an email address'
                                            onChange={(e) => { var field = { ...this.state.formData }; field.location.locationEmail = e.target.value; this.setState({ formData: field }) }}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label>Address *</label>
                                    <input required error={this.state.formErrors.locationAddress} value={this.state.formData.location.locationAddress} placeholder='Enter an address for the location'
                                        onChange={(e) => { (e.target.value == 0) ? this.state.formErrors.locationAddress = true : this.state.formErrors.locationAddress = false; var field = { ...this.state.formData }; field.location.locationAddress = e.target.value; this.setState({ formData: field }) }}
                                    />
                                </Form.Field>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Contact Person *</label>
                                        <input required error={this.state.formErrors.contactPerson} value={this.state.formData.location.contact[0].contactPerson} placeholder='Enter the name of contact person'
                                            onChange={(e) => {
                                                (e.target.value == 0) ? this.state.formErrors.contactPerson = true : this.state.formErrors.contactPerson = false;
                                                var updateForm = { ...this.state.formData };
                                                var updateContact = updateForm.location.contact;
                                                updateContact[0].contactPerson = e.target.value;
                                                updateForm.location.contact = updateContact;
                                                this.setState({ formData: updateForm });
                                            }}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Contact Number *</label>
                                        <input type='number' error={this.state.formErrors.contactNumber} value={this.state.formData.location.contact[0].contactNumber} required placeholder='Enter a contact number'
                                            onChange={(e) => {
                                                (e.target.value == 0) ? this.state.formErrors.contactNumber = true : this.state.formErrors.contactNumber = false;
                                                var updateForm = { ...this.state.formData };
                                                var updateContact = updateForm.location.contact;
                                                updateContact[0].contactNumber = e.target.value;
                                                updateForm.location.contact = updateContact;
                                                this.setState({ formData: updateForm });
                                            }}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </div>
                            : ""}
                    </Form>

                    {(this.state.activeStep == 2) ?
                        <div>
                            <h1>Data You Are Submitting</h1><hr />
                            Customer: {this.state.formData.customerName}<br />
                            Location (Primary): {this.state.formData.location.locationName}<br />
                            Address: {this.state.formData.location.locationAddress}<br />
                            Email: {this.state.formData.location.locationEmail}<br />
                            Contact: {this.state.formData.location.contact[0].contactPerson} <b>{this.state.formData.location.contact[0].contactNumber}</b>
                        </div>
                        : ""}


                </Modal.Content>
                <Modal.Actions>
                    <Button floated='left' color='grey' onClick={() => {
                        this.setState({ activeStep: 0, showModal: false });
                        this.setState({
                            formData: {
                                customerName: "",
                                location: {
                                    locationName: "",
                                    locationAddress: "",
                                    locationEmail: "",
                                    contact: [{
                                        contactPerson: "",
                                        contactNumber: ""
                                    }]
                                }
                            }
                        })
                    }}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button disabled={this.state.activeStep == 0} color='grey' onClick={() => (this.state.activeStep > 0 && this.state.activeStep < 2) ? this.setState({ activeStep: this.state.activeStep - 1 }) : this.setState({ activeStep: this.state.activeStep - 1 })}>
                        {/* <Icon name='checkmark' />*/} Previous
                    </Button>
                    <Button color='green' inverted onClick={() => {
                        if (this.state.activeStep == 2) {
                            this.submitForm();
                            return;
                        };
                        (this.state.activeStep >= 0 && this.state.activeStep < 2)
                            ? this.setState({ activeStep: this.state.activeStep + 1 })
                            : this.setState({ activeStep: 2 }
                            );
                    }}>
                        {/* <Icon name='checkmark' />*/} {this.state.steps[this.state.activeStep].button}
                    </Button>

                </Modal.Actions>
            </Modal >
        );
    }
}
export default AddCustomerModal