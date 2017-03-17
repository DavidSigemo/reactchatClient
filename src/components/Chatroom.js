import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

export default class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        console.log("test", props);
        this.state = {
            RoomName: "",
            Locked: true,
            Password: "",
            ConnectionCount: 0
        }
        this.state.RoomName = this.props.RoomName;
        this.state.Locked = this.props.Locked;
        this.state.Password = this.props.Password;
        // this.getConnectionCount = this.getConnectionCount.bind(this);
    }

    // getConnectionCount() {
    //     console.log(this.state.ConnectionCount);
    // }

    render() {
        //this.getConnectionCount();
        return (
            <div className="chatroom">
                <h1>{this.state.RoomName}</h1>
                <h2>{this.state.Locked}</h2>
                <h2>{this.state.Password}</h2>
                <Button disabled={this.state.Locked}>Enter</Button>
            </div>);
    }
}