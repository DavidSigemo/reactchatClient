import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

export default class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            RoomName: "",
            Locked: true,
            Password: "",
            UserConnections: [],
            ConnectionCount: 0
        }
        this.state.ConnectionCount = this.props.UserConnections.length;
        this.state.Locked = this.props.Locked;
        this.getConnectionCount = this.getConnectionCount.bind(this);
    }

    getConnectionCount() {
        console.log(this.state.ConnectionCount);
    }

    render() {
        //this.getConnectionCount();
        return (
            <div className="chatroom1">
                <h1>{this.props.RoomName}</h1>
                <h2>{this.state.ConnectionCount}</h2>
                <Button disabled={this.state.Locked} onClick={this.getConnectionCount}>Enter</Button>
            </div>);
    }
}