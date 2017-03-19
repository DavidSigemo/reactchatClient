import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
require('jquery');
require('ms-signalr-client');
import Axios from 'axios';


export default class ConnectionHandler extends React.Component {
    componentWillMount() {
        var connection = $.hubConnection('http://reactchatapi.azurewebsites.net');
        window.proxy = connection.createHubProxy('messageHub');
        // receives broadcast messages from a hub function, called "broadcastMessage"
        // proxy.on('pushNewMessage', function (message) {
        //     console.log("incoming message", message);
        // });

        window.proxy.on('Test', function (message) {
            console.log("testing", message);
        });

        // atempt connection, and handle errors
        connection.start({ jsonp: true })
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                window.proxy.invoke('Test',"Asdf").done(function () {
                    console.log('Invocation of Test succeeded');
                }).fail(function (error) {
                    console.log('Invocation of Test failed. Error: ' + error);
                });
                localStorage.setItem("connectionId", connection.id);
                console.log("localStorage: " + localStorage.getItem("connectionId"));

                //console.log(this.state.connectionId);
                //proxy.server.SendMessage("test", "message");
            })
            .fail(function () { console.log('Could not connect'); });
    }

    componentDidMount() {
        console.log("componentDidMount: " + localStorage.getItem("connectionId"));
    }
    render() {
        return null;
    }
}