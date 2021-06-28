import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Confirm } from 'semantic-ui-react';

class DeleteConfirmationModal extends Component {
    state = {
        appendModal: false
    };

    render() {
        return (
            <Modal
                basic
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='small'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={this.props.triggerElement} //<Button>{this.props.trigger}</Button>
            >
                <Header icon>
                    <Icon name='trash alternate' />
                    Confirm Deletion Of The {this.props.dataType}?
                </Header>
                <Modal.Content>
                    <p style={{ textAlign: 'center' }}>
                        {this.props.description}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => { this.setState({ appendModal: false }); this.props.function(this.props.functionParams) }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default DeleteConfirmationModal;