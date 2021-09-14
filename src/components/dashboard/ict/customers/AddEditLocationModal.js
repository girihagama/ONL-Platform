import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Input, Label } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';

class ExportCustomersModal extends Component {
    //form validation
    validator = new SimpleReactValidator();

    initialState = {
        formData: {
            customerId: "",
            locationId: "",
            locationName: "",
            locationEmail: "",
            locationAddress: "",
            contactPerson: "",
            contactNumber: "",
        },
        formErrors: {
            locationName: false,
            locationAddress: false,
            contactPerson: false,
            contactNumber: false
        }
    }

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

    submitForm() {
        if (this.validator.allValid()) {
            //alert('You submitted the form and stuff!');            
            var locationData = {
                locationName: this.state.formData.locationName,
                locationEmail: this.state.formData.locationEmail,
                locationAddress: this.state.formData.locationAddress,
                contact: {
                    [this.state.formData.contactPerson]: this.state.formData.contactNumber
                }
            }
            if (this.state.mode == "edit") {
                this.props.function.editLocation(this.state.formData.customerId, this.state.formData.locationId, locationData);
                this.setState({ appendModal: false });
                this.setState({ formData: this.initialState.formData, formErrors: this.initialState.formErrors });
            } else if (this.state.mode == "add") {
                this.props.function.addLocation(this.props.getExpanededCustomer, locationData);
                this.setState({ appendModal: false });
                this.setState({ formData: this.initialState.formData, formErrors: this.initialState.formErrors });
            }            
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    render() {
        //console.log("EXP CUS", this.props.getExpanededCustomer);
        console.log({ "STATE": this.state }, { "PROPS": this.props });

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
                                />{this.validator.message('locationName', this.state.formData.locationName, 'required')}
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="locationEmail" value={this.state.formData.locationEmail} type='email' placeholder='Enter an email address'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />{this.validator.message('locationEmail', this.state.formData.locationEmail, 'email')}
                            </Form.Field>
                        </Form.Group>
                        <Form.Field error={this.state.formErrors.locationAddress}>
                            <label>Address *</label>
                            <Input required name="locationAddress" error={this.state.formErrors.locationAddress} value={this.state.formData.locationAddress} placeholder='Enter an address for the location'
                                onChange={(e) => { this.handleUserInput(e) }}
                            />{this.validator.message('locationAddress', this.state.formData.locationAddress, 'required')}
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field error={this.state.formErrors.contactPerson}>
                                <label>Contact Person *</label>
                                <Input required error={this.state.formErrors.contactPerson} name="contactPerson" value={this.state.formData.contactPerson} placeholder='Enter the name of contact person'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />{this.validator.message('contactPerson', this.state.formData.contactPerson, 'required')}
                            </Form.Field>
                            <Form.Field error={this.state.formErrors.contactNumber}>
                                <label>Contact Number *</label>
                                <Input error={this.state.formErrors.contactNumber} type='number' name="contactNumber" value={this.state.formData.contactNumber} required placeholder='Enter a contact number'
                                    onChange={(e) => { this.handleUserInput(e) }}
                                />{this.validator.message('contactNumber', this.state.formData.contactNumber, 'required|phone')}
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => { this.submitForm(); /*this.setState({ appendModal: false })*/ }}>
                        <Icon name='checkmark' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default ExportCustomersModal;