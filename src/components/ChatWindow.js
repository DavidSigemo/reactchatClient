import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from './ChatMessage';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            messages: [],
            messageValue: ""
        }
        this.state.id = this.props.params.id;
        this.appendChatMessage = this.appendChatMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.clearInputBox = this.clearInputBox.bind(this);
    }

    appendChatMessage(incomingMessage) {
        if (incomingMessage !== "") {

            var previousMessages = this.state.messages;
            var newItem = {
                id: Date.now(),
                sender: localStorage.getItem("connectionId"),
                message: incomingMessage,
                color: '#' + Math.floor(Math.random()*16777215).toString(16)

            }
            previousMessages.push(newItem);
            this.setState({
                messages: previousMessages
            });
        }
    }

    sendMessage(event) {
        if (event.keyCode === 13){
            event.preventDefault();
            event.stopPropagation();

            window.proxy.invoke('SendMessage', this.state.messageValue).done(function () {
                this.setState({
                    messageValue: ""
                })
            }.bind(this)).fail(function (error) {
                console.log('Sending Failed. Error: ' + error);
            });
        }
    }

    clearInputBox() {
        this.setState({
            messageValue: ""
        })
    }

    handleMessageChange(event) {
        this.setState({
            messageValue: event.target.value
        });
    }

    componentDidMount() {
        window.proxy.on('ClientMessage', function (message) {
            this.appendChatMessage(message);
        }.bind(this));
    }

    render() {
        var chatmessages = this.state.messages.map((message) => {
            return <ChatMessage key={message.id.toString()} id={message.id} sender={message.sender} message={message.message} color={message.color} />
        });
        return (
            <div className="chatWindow">
                <div className="chatWindow_Title">
                    <h1>Chatroom {this.state.id}</h1>
                </div>
                <div className="chatWindow_Body">
                    <ul id="messageBox">
                        {chatmessages}
                    </ul>
                </div>
                <div className="chatWindow_Footer">
                    <textarea value={this.state.messageValue} onKeyDown={(event) => {this.sendMessage(event)}} onChange={this.handleMessageChange} placeholder="Skicka ett meddelande" className></textarea>
                </div>
            </div>
        );
    }
}