import React from 'react';
import ReactDOM from 'react-dom';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        }
        this.state.id = this.props.params.id;
    }

    componentDidMount() {
        console.log("window test");
        console.log(window.proxy);

        window.proxy.on('TestChatClient', function (message) {
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
            <div>
                <h1>Chatroom {this.state.id}</h1>
            </div>
        );
    }
}