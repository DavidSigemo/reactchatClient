import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import ConnectionHandler from './ConnectionHandler';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Modal, OverlayTrigger, Popover, Tooltip, Form, Col, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
require('jquery');
require('ms-signalr-client');
import Axios from 'axios';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            usernameInput: "",
            passwordInput: ""
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.getEmailValidationState = this.getEmailValidationState.bind(this);
        this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
        this.activateEmailValidation = this.activateEmailValidation.bind(this);
        this.activatePasswordValidation = this.activatePasswordValidation.bind(this);
    }

    // componentWillMount() {
    //     var connection = $.hubConnection('http://reactchatapi.azurewebsites.net');
    //     var proxy = connection.createHubProxy('messageHub');
    //     // receives broadcast messages from a hub function, called "broadcastMessage"
    //     proxy.on('pushNewMessage', function (message) {
    //         console.log("incoming message", message);
    //     });

    //     proxy.on('Test', function (message) {
    //         console.log("testing", message);
    //     });

    //     // atempt connection, and handle errors
    //     connection.start({ jsonp: true })
    //         .done(function () {
    //             console.log('Now connected, connection ID=' + connection.id);
    //             proxy.invoke('Test',"Asdf").done(function () {
    //                 console.log('Invocation of Test succeeded');
    //             }).fail(function (error) {
    //                 console.log('Invocation of Test failed. Error: ' + error);
    //             });
    //             localStorage.setItem("connectionId", connection.id);
    //             console.log("localStorage: " + localStorage.getItem("connectionId"));

    //             //console.log(this.state.connectionId);
    //             //proxy.server.SendMessage("test", "message");
    //         })
    //         .fail(function () { console.log('Could not connect'); });
    // }

    // componentDidMount() {
    //     console.log("componentDidMount: " + localStorage.getItem("connectionId"));
    // }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleEmailChange(e) {
        this.setState({ usernameInput: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ passwordInput: e.target.value });
    }

    validateEmail(email) {
        var re = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|se|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
        return re.test(email);
    };

    attemptLogin() {
        if (this.validateEmail(this.state.usernameInput) && this.state.passwordInput.length >= 8) {
            Axios.get("http://localhost")
        } else {
            console.log("invalid");
        }
    }

    getEmailValidationState() {
        if (!this.state.validateEmail) {
            return 'warning';
        } else {
            if (!this.validateEmail(this.state.usernameInput)) {
                return 'error';
            }
            else {
                return 'success';
            }
        }
    }

    activateEmailValidation() {
        this.setState({ validateEmail: true });
    }


    getPasswordValidationState() {
        const length = this.state.passwordInput.length;
        if (!this.state.validatePassword) {
            return 'warning';
        } else {
            if (length >= 8) {
                return 'success';
            }
            else {
                return 'error'
            };
        }
    }

    activatePasswordValidation() {
        this.setState({ validatePassword: true });
    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
      </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
      </Tooltip>
        );

        return (
            <div>
                <ConnectionHandler />
                <Navbar className="myNav" inverse fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/home">
                                <NavItem eventKey={1} href="">ReactChat</NavItem>
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/chatrooms">
                                <NavItem eventKey={2} href="#">Chatrooms</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/settings">
                                <NavItem eventKey={3} href="#">Users</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#" onClick={this.open}>Login</NavItem>
                            <NavItem eventKey={2} href="#">Sign up</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl required type="email" placeholder="Email" onBlur={this.activateEmailValidation} onChange={this.handleEmailChange} value={this.state.usernameInput} />
                                    <FormControl.Feedback />
                                    <HelpBlock>Please enter a valid email.</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" onBlur={this.activatePasswordValidation} onChange={this.handlePasswordChange} value={this.state.passwordInput} />
                                    <FormControl.Feedback />
                                    <HelpBlock>Please enter a password that is at least 8 characters long</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={4}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                                <Col smOffset={2} sm={4}>
                                    <Button onClick={this.attemptLogin} type="submit">
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>

                <div className="pageContent container">{this.props.children}</div>
            </div>
            // <div>

            //     <h1>Main Menu</h1>
            //     <Link to="/">Alla kontakter</Link>
            //     <br />
            //     <Link to="create">Skapa ny kontakt</Link>
            //     <br />
            //     <Link to="settings">Inställningar</Link>
            //     <br />

            //     {this.props.children}
            // </div>);
        );
    }
}