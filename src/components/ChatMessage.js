import React from 'react';
import ReactDOM from 'react-dom';

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            sender: "",
            message: ""
        }
        this.state.id = this.props.id;
        this.state.sender = this.props.sender;
        this.state.message = this.props.message;
    }

    render() {
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        return (
            <li id={"message" + this.state.id} className="messageRow">
                <p className="messageItem"><span style={{color: randomColor}}>{this.state.sender} : </span>{this.state.message}</p>
            </li>
        );
    }
}