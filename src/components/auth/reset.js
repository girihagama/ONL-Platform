import React, { Component } from 'react';
import { Container, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class reset extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' /> Reset your platform password
      </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                                    <Form.Input fluid icon='file code' iconPosition='left' placeholder='Reset code' />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='New password'
                                        type='password'
                                    />


                                    <Button.Group fluid>
                                        <Button size='large'>
                                            Get code
                                        </Button>
                                        <Button color='teal' size='large'>
                                            Reset
                                        </Button>
                                    </Button.Group>
                                </Segment>
                            </Form>
                            <Message>
                                Go back to <a href='/'>Login</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default reset;