import React, { Component } from 'react';
import { Container, Button, Form, Grid, Header, Image, Message, Segment, Select } from 'semantic-ui-react';

class login extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' /> Log-in to your platform account
      </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid required type='email' icon='user' iconPosition='left' placeholder='E-mail address' />
                                    <Form.Input
                                        fluid
                                        required
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                    />
                                    <Form.Field
                                        control={Select}
                                        required                                        
                                        value='ict'
                                        options={[
                                            { key: 'ict', text: 'ICT', value: 'ict' },
                                            { key: 'technical', text: 'Technical', value: 'technical' }
                                        ]}
                                        placeholder='Select Patform'
                                    />

                                    <Button color='teal' fluid size='large'>
                                        Login
          </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Forgot Password? <a href='/reset'>Reset Password</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default login;