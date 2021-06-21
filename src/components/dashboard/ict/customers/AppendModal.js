import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Form, Message } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';

class DeleteConfirmation extends Component {
    state = {
        appendModal: false,
        appendList: null
    };

    fileProcessor(e) {
        //console.log(e.target.files[0].name);
        var file = e.target.files[0];
        var fileString = "";
        var fileJson = [];
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
            // Entire file
            //console.log(this.result);

            // By lines
            var lines = this.result.split('\n');

            //creating String
            for (var line = 0; line < lines.length; line++) {
                //console.log(lines[line]);
                fileString.concat(lines[line]);
            }

            //creating JSON
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                fileJson.push(obj);
            }

            reader.onloadend();
        };
        reader.readAsText(file);

        reader.onloadend = () => {
            //console.log("Read Done", fileJson);
            this.setState({ appendList: fileJson });
        }
    }

    render() {
        //console.log(this.state.appendList);

        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='small'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={<Button>Append</Button>}
            >
                <Header>
                    Append Customer Records
                </Header>
                <Modal.Content>
                    <center>
                        Select the list of customers (CSV) to append<br />
                        <InputFile
                            required
                            button={{ active: true }}
                            accept=".csv"
                            input={{
                                id: 'csv-import',
                                accept: '.csv',
                                onChange: (e) => { this.fileProcessor(e) }
                            }}
                        />
                    </center>
                    <Message negative>
                        <Message.Header>We are processing</Message.Header>
                        <p>Please wait...</p>
                    </Message>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' onClick={() => this.setState({ appendModal: false })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button disabled color='green' inverted onClick={() => this.setState({ appendModal: false })}>
                        {/* <Icon name='checkmark' />*/} Upload
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
export default DeleteConfirmation