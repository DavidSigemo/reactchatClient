import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col } from 'react-bootstrap';
import {Icon} from 'react-fa'
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

export default class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: -1,
            Name: "",
            Description: "",
            Locked: true,
            Password: "",
            ConnectionCount: 0
        }
        this.state.Id = this.props.Id;
        this.state.Name = this.props.Name;
        this.state.Description = this.props.Description;
        this.state.Locked = this.props.Locked;
        this.state.Password = this.props.Password;
        // this.getConnectionCount = this.getConnectionCount.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
    }

    // getConnectionCount() {
    //     console.log(this.state.ConnectionCount);
    // }

    enterRoom(roomId){
        var roomPath = '/chatrooms/room/' + roomId;
        browserHistory.push(roomPath);
    }

    render() {
        var enterPath = 'room/' + this.state.Id;
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        //this.getConnectionCount();
        return (
            <div className="chatroomTile col-xs-2">
                <div style={{backgroundColor: randomColor}} className="chatroomTile_Title">
                    <h2>{this.state.Name}</h2>
                </div>
                <div className="chatroomTile_Content">
                    <h4>{(this.state.Description.length > 90) ? this.state.Description.substr(0,90).trim() + '..' : this.state.Description}</h4>
                </div>
                <div style={{backgroundColor: randomColor}} className="chatroomTile_Footer">
                    <Button onClick={() => {this.enterRoom(this.state.Id)}} className="chatroomEnter pull-right" >
                        Enter
                        <br />
                        <Icon name={this.state.Locked ? 'lock' : 'unlock-alt'} />
                    </Button>
                </div>
            </div>);
    }
}