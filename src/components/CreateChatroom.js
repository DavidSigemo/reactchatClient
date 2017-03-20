import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class CreateChatroom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Want to create your own chatroom? <a href="">Click here</a></p>
            </div>
        );
    }
}