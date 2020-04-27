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
      <img src="https://www.w3schools.com/tags/smiley.gif" alt="loading..."/>
      <br/>
      {message}
      <br/>
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
    <div className="input-container">
      <div className="cam-btn"><img className="cam-btn-icon" alt="cam" src={require('./assets/cam-btn-icon.png')}></img></div>
      <div className="input-box-send">
      <input type="text" placeholder="Type a message" className="input-box">
      </input>
      <div className="send-btn"><img className="send-btn-icon" alt="send" src={require('./assets/send-btn-icon.png')}></img></div>
      </div>
    </div>
    </div>);
  }
}
export default Chat;