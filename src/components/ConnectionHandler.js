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

        // atempt connection, and handle errors
        connection.start({ jsonp: true })
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                localStorage.setItem("connectionId", connection.id);
            }).fail(function () { console.log('Could not connect'); });
    }

    render() {
        return null;
    }
}