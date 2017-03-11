import React from 'react';
import ReactDOM from 'react-dom';
//import HelloWorld from './components/HelloWorld'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateChatroom from './components/CreateChatroom';
import Layout from './components/Layout';
import Chatrooms from './components/Chatrooms';
import Settings from './components/Settings';
import ConnectionHandler from './components/ConnectionHandler';
import Axios from 'axios';
import './app.css';
import { Router, Route, IndexRoute, hashHistory} from "react-router";


// ReactDOM.render(<ContactBook contacts={contacts}/>, document.getElementById("main"));
ReactDOM.render(
    <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Chatrooms}></IndexRoute>
                <Route path="chatrooms" component={CreateChatroom}></Route>
                <Route path="settings" component={Settings}></Route>
            </Route>
    </Router>, document.getElementById("main"));