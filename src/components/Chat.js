import React from "react";
import './chat.css';
import Message from './Message';

class Chat extends React.Component {
  state = {
    chatList: [],
  };
  constructor(){
    super();
    this.addRecieved = this.addRecieved.bind(this);
    this.addSent = this.addSent.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    var mess1 = new Message(true);
    mess1.setText("Hey dude https://web.whatsapp.com/ check this out\nhttps://web.whatsapp.com/");
    mess1.setImage("https://user-images.githubusercontent.com/29608698/44212183-101bbe80-a141-11e8-9c4c-dcf3269508e0.png");
    this.addRecieved(mess1);
    this.sendMessage("Hey dude https://web.whatsapp.com/ check this out\nhttps://web.whatsapp.com/","https://user-images.githubusercontent.com/29608698/44212183-101bbe80-a141-11e8-9c4c-dcf3269508e0.png");
    this.addRecieved(mess1);
    this.sendMessage("Hey dude https://web.whatsapp.com/ check this out\nhttps://web.whatsapp.com/","https://user-images.githubusercontent.com/29608698/44212183-101bbe80-a141-11e8-9c4c-dcf3269508e0.png");
    this.addRecieved(mess1);
    this.sendMessage("Hey dude https://web.whatsapp.com/ check this out\nhttps://web.whatsapp.com/","https://user-images.githubusercontent.com/29608698/44212183-101bbe80-a141-11e8-9c4c-dcf3269508e0.png");
  }
  addRecieved(message = new Message()) {
    var list = this.state.chatList;
    list.push(<div key={list.length} className="recMes">
      {message.state.image!=null ? message.state.image : ""}
      <br/>
      {message.state.text!=null?message.state.text:""}
    </div>);
    this.setState({ chatList: list });
  }
  addSent(message = new Message()) {
    var list = this.state.chatList;
    list.push(<div key={list.length} className="cover"><div className="sentMes">
      {message.state.image!=null ? message.state.image : ""}
      <br/>
      {message.state.text!=null?message.state.text:""}
    </div></div>);
    this.setState({ chatList: list });
  }
  sendMessage(text,url){
    var message = new Message(false);
    message.setText(text);
    message.setImage(url);
    this.addSent(message);
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