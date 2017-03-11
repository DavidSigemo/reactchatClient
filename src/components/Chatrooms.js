import React from 'react';
import ReactDOM from 'react-dom';
import Chatroom from './Chatroom';
import Axios from 'axios';
import { Button, Col } from 'react-bootstrap';
require('jquery');
require('ms-signalr-client');

export default class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.contacts = [];
        this.state = {
            chatrooms: [],
            connectionId: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // var connection = $.hubConnection('http://localhost:53356/');
        // var proxy = connection.createHubProxy('MessageHub');

        // // receives broadcast messages from a hub function, called "broadcastMessage"
        // proxy.on('pushNewMessage', function (message) {
        //     console.log("incoming message", message);
        // });

        // proxy.on('test', function (message) {
        //     console.log("incoming message", message);
        // });

        // // atempt connection, and handle errors
        // connection.start({ jsonp: true })
        //     .done(function () {
        //         console.log('Now connected, connection ID=' + connection.id);
        //         this.setState({
        //             connectionId: connection.id
        //         });
        //         console.log("after");
        //         console.log(this.state.connectionId);
        //         //proxy.server.SendMessage("test", "message");
        //     })
        //     .fail(function () { console.log('Could not connect'); });


        // Axios.get('http://localhost:52495/api/Chatroom/')
        //     .then(function (response) {
        //         this.setState({
        //             chatrooms: response.data
        //         });
        //     }.bind(this)
        //     ).catch((err) => {
        //         console.log(err);
        //     })
    }


    render() {
        var chatrooms = this.state.chatrooms.map((chatroom) => {
            return <Chatroom key={chatroom.ChatroomId} RoomName={chatroom.RoomName} UserConnections={chatroom.UserConnections} Locked={chatroom.Locked} />
        });
        return (
            <div>
                {chatrooms}
            </div>
        );
    }
}