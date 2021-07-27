import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Label, Message } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';

class DeleteConfirmation extends Component {
    state = {
        appendModal: false,
        appendList: null,
        working: false
    };

    fileProcessor(e) {
        //console.log(e.target.files[0].name);
        this.setState({ appendList: null, working: true });
        var file = e.target.files[0];
        if (!file) {
            this.setState({ working: false, appendList: null });
            return;
        }
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
                    obj[(headers[j]).replace(/\s+$/, '')] = currentline[j];
                }
                fileJson.push(obj);
            }

            reader.onloadend();
        };
        reader.readAsText(file);

        reader.onloadend = () => {
            //console.log("Read Done", fileJson);
            this.setState({ appendList: fileJson, working: false });
        }
    }

    render() {
        //console.log(this.state.appendList);

        return (
            <Modal
                onClose={() => this.setState({ appendModal: false })}
                onOpen={() => this.setState({ appendModal: true })}
                open={this.state.appendModal}
                size='tiny'
                closeOnEscape={this.props.dismissable}
                closeOnDimmerClick={this.props.dismissable}
                trigger={<Button>Append</Button>}
            >
                <Header>
                    Append Customer Records
                </Header>
                <Modal.Content>
                    {(this.state.working) ?
                        <Message negative>
                            <Message.Header>We are processing</Message.Header>
                            <p>Please wait...</p>
                        </Message>
                        :
                        <center>
                            Select the list of customers (CSV) to append<br /><br />
                            <InputFile
                                required
                                button={{ active: true, color: 'teal', size: 'small' }}
                                accept=".csv"
                                input={{
                                    id: 'csv-import',
                                    accept: '.csv',
                                    onChange: (e) => { this.fileProcessor(e) },
                                    onClick: (e) => {
                                        if (this.state.appendList) {
                                            this.setState({ appendList: null });
                                        }
                                    }
                                }}
                            />
                            {(this.state.appendList) ?
                                <Label color='teal' size='large' pointing="left">
                                    {(this.state.appendList) ? this.state.appendList.length : ""} Recods Selected
                                </Label>
                                : ""
                            }
                            <br />
                            {(this.state.appendList) ?
                                'Click "Upload" to initiate the append records.'
                                : ""
                            }
                        </center>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button floated='left'><a href='/TEMPLATES/customerImport_Template.xlsx' download>Download Template</a></Button>
                    <Button color='grey' onClick={() => this.setState({ appendModal: false, appendList: null })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button disabled={this.state.appendList == null} color='green' inverted onClick={() => this.setState({ appendModal: false })}>
                        {/* <Icon name='checkmark' />*/} Upload
                    </Button>
                </Modal.Actions>
            </Modal >
        );
    }
}
export default DeleteConfirmation