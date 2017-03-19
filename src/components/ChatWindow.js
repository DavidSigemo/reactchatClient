import React from 'react';
import ReactDOM from 'react-dom';

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
    }

    appendChatMessage() {
        console.log("sent " + this.state.messageValue);
    }

    sendMessage(event) {
        if (event.keyCode === 13){
            event.preventDefault();
            event.stopPropagation();

            this.appendChatMessage();
        }
    }
    
    handleMessageChange(event) {
        this.setState({messageValue: event.target.value})
    }

    componentDidMount() {

        window.proxy.on('HandleMessage', function (message) {
            console.log("testing", message);
        });

        window.proxy.invoke('TestChatServer', "Asdf").done(function () {
            console.log('Invocation of Test succeeded');
        }).fail(function (error) {
            console.log('Invocation of Test failed. Error: ' + error);
        });

    }

    render() {
        return (
            <div className="chatWindow">
                <div className="chatWindow_Title">
                    <h1>Chatroom {this.state.id}</h1>
                </div>
                <div className="chatWindow_Body">
                    <ul id="messageBox">
                    </ul>
                </div>
                <div className="chatWindow_Footer">
                    <textarea value={this.state.messageValue} onKeyDown={(event) => {this.sendMessage(event)}} onChange={this.handleMessageChange} placeholder="Skicka ett meddelande" className></textarea>
                </div>
            </div>
        );
    }
}