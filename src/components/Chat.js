import React from "react";
import './chat.css';

class Chat extends React.Component {
  state = {
    chatList: [],
  };
  constructor(){
    super();
    this.getRecieved = this.getRecieved.bind(this);
    this.getSent = this.getSent.bind(this);
    this.getRecieved("hello");
    this.getRecieved("hello");
    this.getRecieved("hello");
    this.getSent("hello");
    this.getSent("hello short");
    this.getSent("hello longgggggggggggggggggggggggggggggggggz");
    this.getSent("hello very longzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzQ");
    this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");
    this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");this.getSent("hello");
    this.getRecieved("hello");
    this.getSent("hello");
  }
  componentDidMount() {
  }
  getRecieved(message) {
    var list = this.state.chatList;
    list.push(<div className="recMes">
      {message}
    </div>);
    this.setState({ chatList: list });
  }
  getSent(message) {
    var list = this.state.chatList;
    list.push(<div className="cover"><div className="sentMes">
      <img className="gif-size" src="https://www.w3schools.com/tags/smiley.gif"/>
      {message}
      <a href="https://www.w3schools.com/tags/smiley.gif">Here</a>
    </div></div>);
    this.setState({ chatList: list });
  }
  render() {
    return(
    <div className="chatParent">
    <div className="topBar">
      GrayBot
    </div>
    <div className="chatConv">
      {this.state.chatList}
    </div>
    
    </div>);
  }
}
export default Chat;