import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Input, Label } from 'semantic-ui-react';

class ExportCustomersModal extends Component {
    state = {
        appendModal: false,
        mode: this.props.mode,
        customerName: this.props.customer[1],
        formData: {
            customerId: (this.props.customer) ? this.props.customer[0] : "",
            locationId: (this.props.data && this.props.data.id) ? this.props.data.id : "",
            locationName: (this.props.data && this.props.data.locationName) ? this.props.data.locationName : "",
            locationEmail: (this.props.data && this.props.data.locationEmail) ? this.props.data.locationEmail : "",
            locationAddress: (this.props.data && this.props.data.locationAddress) ? this.props.data.locationAddress : "",
            contactPerson: (this.props.data && this.props.data.contact) ? this.contactProcessor(this.props.data.contact)[0][0] : "",
            contactNumber: (this.props.data && this.props.data.contact) ? this.contactProcessor(this.props.data.contact)[0][1] : "",
        },
        formErrors: {
            locationName: false,
            locationAddress: false,
            contactPerson: false,
            contactNumber: false
        }
    };

    contactProcessor(contacts) {
        var processed = [];

        Object.entries(contacts).map(([key, value], index) => {
            processed.push([key, value]);
        });

        return processed;
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const formData = { ...this.state.formData, [name]: value }
        this.setState({ formData });
        this.autoValidation(e);
    }

    autoValidation(e) {//identify form errors
        switch (e.target.name) {
            case e.target.name: {
                if (e.target.name == 'locationEmail') { // exclude non required fields
                    break;
                }
                if (e.target.value == "") {
                    var formErrors = { ...this.state.formErrors, [e.target.name]: true };
                    this.setState({ formErrors });
                } else if (e.target.value.length > 0) {
                    var formErrors = { ...this.state.formErrors, [e.target.name]: false };
                    this.setState({ formErrors });
                }
            }
        }
    }

    manualValidation() {
        var formErrors = this.state.formErrors;
        Object.entries(formErrors).map(([key, value], index) => {
            var itemKey = key;
            var itemValue = value;

            if (this.state.formData[itemKey].length < 1) {
                var formErrorsU = { ...this.state.formErrors, [itemKey]: true };
                this.setState({ formErrors: formErrorsU });
                console.log(itemKey, "Set true");
            } else if (this.state.formData[itemKey].length > 0) {
                var formErrorsU = { ...this.state.formErrors, [itemKey]: false };
                this.setState({ formErrors: formErrorsU });
                console.log(itemKey, "Set false");
            }
        });
        console.log('validation complete');
        this.handleSubmit();
    }

    handleSubmit() {
        var submission = true;
        var formErrors = this.state.formErrors;

        for (var key in formErrors) {
            if (formErrors.hasOwnProperty(key)) {
                console.log(key + " -> " + formErrors[key]);
                if (formErrors[key] == null || formErrors[key] == true) {
                    //console.log("validation error");
                    submission = false;
                    break;
                }
            }
        }

        if (submission) {
            console.log("Submit Form");
            //submit form
            if (this.state.mode == "edit") {
                console.log("Submit updates");
                var locationData = {
                    locationName : this.state.formData.locationName,
                    locationEmail : this.state.formData.locationEmail,
                    locationAddress: this.state.formData.locationAddress,
                    contact:{
                        [this.state.formData.contactPerson] : this.state.formData.contactNumber
                    }
                }
                this.props.function.editLocation(this.state.formData.customerId, this.state.formData.locationId, locationData);
                this.setState({ appendModal: false });
            }else if (this.state.mode == "add") {
                console.log("Submit new");
                var locationData = {
                    locationName : this.state.formData.locationName,
                    locationEmail : this.state.formData.locationEmail,
                    locationAddress: this.state.formData.locationAddress,
                    contact:{
                        [this.state.formData.contactPerson] : this.state.formData.contactNumber
                    }
                }
                this.props.function.addLocation(this.state.formData.customerId, locationData);
                this.setState({ appendModal: false });
            }
        } else {
            console.log("Invalid Form", this.state.formErrors);
        }
    }

    render() {
        console.log({"STATE":this.state},{"PROPS":this.props});

        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='large'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={this.props.triggerElement}
            >
                <Header>
                    {this.props.dataType}
                    <Header.Subheader>{this.props.customer[1]}</Header.Subheader>
                </Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field error={this.state.formErrors.locationName}>
                                <label>Location Name *</label>
                                <Input name="locationName" error={this.state.formErrors.locationName} value={this.state.formData.locationName} required placeholder='Enter a name for the location' autoFocus
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="locationEmail" value={this.state.formData.locationEmail} type='email' placeholder='Enter an email address'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field error={this.state.formErrors.locationAddress}>
                            <label>Address *</label>
                            <Input required name="locationAddress" error={this.state.formErrors.locationAddress} value={this.state.formData.locationAddress} placeholder='Enter an address for the location'
                                onChange={(e) => { this.handleUserInput(e) }}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field error={this.state.formErrors.contactPerson}>
                                <label>Contact Person *</label>
                                <Input required error={this.state.formErrors.contactPerson} name="contactPerson" value={this.state.formData.contactPerson} placeholder='Enter the name of contact person'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />
                            </Form.Field>
                            <Form.Field error={this.state.formErrors.contactNumber}>
                                <label>Contact Number *</label>
                                <Input error={this.state.formErrors.contactNumber} type='number' name="contactNumber" value={this.state.formData.contactNumber} required placeholder='Enter a contact number'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => { this.handleSubmit(); /*this.setState({ appendModal: false })*/ }}>
                        <Icon name='checkmark' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default ExportCustomersModal;