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
    }

    appendChatMessage() {
        if (this.state.messageValue !== "") {

            var previousMessages = this.state.messages;
            var newItem = {
                id: Date.now(),
                sender: localStorage.getItem("connectionId"),
                message: this.state.messageValue
            }
            previousMessages.push(newItem);
            this.setState(
                {
                    messages: previousMessages,
                    messageValue: ""
                });
            // window.proxy.invoke('SendMessage', this.state.messageValue).done(function () {
            //     var messageRow = document.createElement("li");
            //     var messageToAppend = document.createElement("span")
            //     var a = "<li><p><span>" + localStorage.getItem("connectionId") + " : </span>" + this.state.messageValue + "</p></li>"
            // }).fail(function (error) {
            //     console.log('Invocation of Test failed. Error: ' + error);
            // });
            // console.log("sent " + this.state.messageValue);
        }
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
        var chatmessages = this.state.messages.map((message) => {
            console.log(message);
            return <ChatMessage key={message.id.toString()} id={message.id} sender={message.sender} message={message.message} />
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