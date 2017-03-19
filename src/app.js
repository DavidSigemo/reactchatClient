import React from 'react';
import ReactDOM from 'react-dom';
//import HelloWorld from './components/HelloWorld'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateChatroom from './components/CreateChatroom';
import Layout from './components/Layout';
import Chatrooms from './components/Chatrooms';
import Frontpage from './components/Frontpage';
import ChatWindow from './components/ChatWindow';
import Settings from './components/Settings';
import ConnectionHandler from './components/ConnectionHandler';
import Axios from 'axios';
import './app.css';
import { Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";


// ReactDOM.render(<ContactBook contacts={contacts}/>, document.getElementById("main"));
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Frontpage} />
            <Route name="home" path="/home" component={Frontpage}></Route>
            <Route name="chatrooms" path="/chatrooms" component={Chatrooms}></Route>
            <Route name="room" path="/chatrooms/room/:id" component={ChatWindow}></Route>
            <Route name="settings" path="/settings" component={Settings}></Route>
        </Route>
    </Router>, document.getElementById("main")
);