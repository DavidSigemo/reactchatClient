import React from 'react';
import ReactDOM from 'react-dom';

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            sender: "",
            message: "",
            color: ""
        }
        this.state.id = this.props.id;
        this.state.sender = this.props.sender;
        this.state.message = this.props.message;
        this.state.color = this.props.color;
    }

    render() {
        return (
            <li id={"message" + this.state.id} className="messageRow">
                <p className="messageItem"><span style={{color: this.state.color}}>{this.state.sender} : </span>{this.state.message}</p>
            </li>
        );
    }
}