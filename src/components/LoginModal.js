import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Modal, OverlayTrigger, Popover, Tooltip, Form, Col, ControlLabel, Checkbox } from 'react-bootstrap';

var Modal = React.createClass({
    render: function(){
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login {this.state.passwordInput}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" onChange={this.handleEmailChange} value={this.state.usernameInput} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.passwordInput} />
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
        )
    }
})