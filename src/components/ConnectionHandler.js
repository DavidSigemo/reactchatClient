import React from 'react';
require('jquery');
require('ms-signalr-client');


export default class ConnectionHandler extends React.Component {
    componentDidMount() {
        console.log("test");
        var connection = $.hubConnection('http://localhost:53356/');
        var proxy = connection.createHubProxy('MessageHub');

        // receives broadcast messages from a hub function, called "broadcastMessage"
        proxy.on('pushNewMessage', function (message) {
            console.log("incoming message", message);
        });

        proxy.on('test', function (message) {
            console.log("incoming message", message);
        });

        // atempt connection, and handle errors
        connection.start({ jsonp: true })
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                this.setState({
                    connectionId: connection.id
                });
                console.log("after");
                console.log(this.state.connectionId);
                //proxy.server.SendMessage("test", "message");
            })
            .fail(function () { console.log('Could not connect'); });
    }
}