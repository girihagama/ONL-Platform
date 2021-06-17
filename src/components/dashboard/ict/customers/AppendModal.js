import React, { Component } from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';

class AppendModal extends Component {
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
                trigger={<Button>Basic Modal</Button>}
            >
                <Header icon>
                    <Icon name='archive' />
                    Archive Old Messages
                </Header>
                <Modal.Content>
                    <p>
                        Your inbox is getting full, would you like us to enable automatic
                        archiving of old messages?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}


export default AppendModal;