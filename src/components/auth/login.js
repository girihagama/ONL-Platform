import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form, Grid, Header, Image, Message, Segment, Select } from 'semantic-ui-react';
import { signIn } from '../../store/actions/authActions';
import { Loader, Dimmer } from 'semantic-ui-react';

class Login extends Component {
    state = {
        username: 'indunil.onet@gmail.com',
        password: 'indunil',
        platform: 'ict'
    }

    handleSubmit = () => {
        console.log('Submitted', this.state);
        this.props.signIn(this.state.username, this.state.password, this.state.platform);
    }

    render() {
        console.log('Login.js', { state: this.state, props: this.props });

        return (
            <div>
                <Container>
                    {this.props.logged &&
                        <Dimmer page active><Loader size='huge' active>Loading...<hr /><img alt="logo" src="/logo_white.png" height="80px" /></Loader></Dimmer>
                    }

                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' /> Log-in to your platform account
                            </Header>
                            <Form size='large' onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        required
                                        error={(this.props.auth.error) ? true : false}
                                        type='email'
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='E-mail address'
                                        value={this.state.username}
                                        onChange={e => { this.setState({ username: e.target.value }) }}
                                    />
                                    <Form.Input
                                        fluid
                                        required
                                        error={this.props.auth.error}
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        value={this.state.password}
                                        onChange={e => { this.setState({ password: e.target.value }) }}
                                    />
                                    <Form.Field
                                        control={Select}
                                        required
                                        value={this.state.platform}
                                        options={[
                                            { key: 'ict', text: 'ict', value: 'ict' },
                                            { key: 'technical', text: 'technical', value: 'technical' }
                                        ]}
                                        placeholder='Select Patform'
                                        onChange={e => { this.setState({ platform: e.target.textContent }) }}
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

const mstp = (state) => {
    return state;
    // OR return specific object as follows
    /*return {
        objectname : state.objectname
    }*/
}

const mdtp = (dispatch) => {
    return {
        signIn: (username, password, platform) => dispatch(signIn(username, password, platform)),
    }
}

export default connect(mstp, mdtp)(Login);