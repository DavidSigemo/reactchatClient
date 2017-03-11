import React from 'react';
import ReactDOM from 'react-dom';

export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        //this.props.text = "Default text";
        //this.props.children = "Default children text";
        this.state = { 
            isChecked: true,
            name: "Jonas"
        };
        this.OnCheckboxChanged = this.OnCheckboxChanged.bind(this);
    }
    OnButtonClick() {
        alert("Du tryckte på knappen");
    }
    OnCheckboxChanged() {
        this.setState({isChecked: !this.state.isChecked});
        console.log(ReactDOM.findDOMNode(this.refs.kryssbox).checked);
    }
    render() {
        return (
            <div>
                <h1>{this.props.text}</h1>
                <h2>{this.props.children}</h2>
                <h3>{this.state.name}</h3>
                <button onClick={this.OnButtonClick}>Klicka här nu!</button>
                <input ref="kryssbox" type="checkbox" onChange={this.OnCheckboxChanged} checked={this.state.isChecked} />
                {this.state.isChecked ? console.log("checked") : console.log("inte checkad") }
            </div>
        );            
    }
}