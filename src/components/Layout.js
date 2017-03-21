import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import ConnectionHandler from './ConnectionHandler';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Modal, OverlayTrigger, Popover, Tooltip, Form, Col, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
require('jquery');
require('ms-signalr-client');
import Axios from 'axios';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: false,
            showRegisterModal: false,
            usernameInput: "",
            passwordInput: ""
        };
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.closeRegisterModal = this.closeRegisterModal.bind(this);
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.getEmailValidationState = this.getEmailValidationState.bind(this);
        this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
        this.activateEmailValidation = this.activateEmailValidation.bind(this);
        this.activatePasswordValidation = this.activatePasswordValidation.bind(this);
    }

    closeLoginModal() {
        this.setState({ showLoginModal: false });
    }

    openLoginModal() {
        this.setState({ showLoginModal: true });
    }

    closeRegisterModal(){
        this.setState({ showRegisterModal: false});
    }

    openRegisterModal(){
        this.setState({ showRegisterModal: true});
        this.refs.child.openRegisterModal();
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
                test popover
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                test tooltip
            </Tooltip>
        );

        // var registerModal = (
        //     <RegisterModal show={this.state.showRegisterModal} onHide={this.closeRegisterModal} ref="child" />
        // );

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
                            <NavItem eventKey={1} href="#" onClick={this.openLoginModal}>Login</NavItem>
                            <NavItem eventKey={2} href="#" onClick={this.openRegisterModal}>Sign up</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <RegisterModal ref="child" />

                <Modal show={this.state.showLoginModal} onHide={this.closeLoginModal}>
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
        );
    }
}