import React from 'react';
import ReactDOM from 'react-dom';
import Chatroom from './Chatroom';
import Axios from 'axios';
import {
    Button,
    Col
} from 'react-bootstrap';
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
        Axios.get('http://reactchatapi.azurewebsites.net/api/Chatroom/')
            .then(function (response) {
                var responseData = JSON.parse(response.data);
                this.setState({
                    chatrooms: responseData
                });
            }.bind(this)).catch((err) => {
                console.log(err);
            })
    }


    render() {
        var chatrooms = this.state.chatrooms.map((chatroom) => {
            return <Chatroom key={chatroom.Id.toString()} RoomName={chatroom.RoomName} Locked={chatroom.Locked} Password={chatroom.Password} />
        });
        return ( <div>{chatrooms}</div>);
    }
}