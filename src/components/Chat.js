import React from "react";
import './chat.css';
import Message from './Message';
import { FcCamera } from "react-icons/fc";
import { MdSend } from "react-icons/md";
import axios from 'axios';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {GoPrimitiveDot} from 'react-icons/go';
import { AiOutlineCloseCircle } from "react-icons/ai";

class Chat extends React.Component {
  state = {
    chatList: [],
    messageText: '',
    totcon: '',
    openimg: '',
    imageUrl: '',
    key: '',
    imsrc : null
  };
  imageinputRef = React.createRef();
  source;
  constructor(){
    super();
    this.addRecieved = this.addRecieved.bind(this);
    this.addSent = this.addSent.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessageClicked = this.sendMessageClicked.bind(this);
    this.messageRecievedEvent = this.messageRecievedEvent.bind(this);
    this.keyRecievedEvent = this.keyRecievedEvent.bind(this);
    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.sendMessageClicked = this.sendMessageClicked.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getRecieved = this.getRecieved.bind(this);
    this.connectionsUpdate = this.connectionsUpdate.bind(this);
    this.hide = this.hide.bind(this);
    this.cambuttonClicked = this.cambuttonClicked.bind(this);
    this.imageChanged = this.imageChanged.bind(this);
    this.show = this.show.bind(this);
  }
  componentDidMount() {
    this.source = new EventSource('http://ec2-13-235-246-42.ap-south-1.compute.amazonaws.com:3000/events');
    this.source.addEventListener('mr',this.messageRecievedEvent);
    this.source.addEventListener('key',this.keyRecievedEvent);
    this.source.addEventListener('up',this.connectionsUpdate);
    var mess1 = new Message('user1',true);
    mess1.setText("Hey dude https://web.whatsapp.com/ check this out\nhttps://web.whatsapp.com/");
    mess1.setImage("https://user-images.githubusercontent.com/29608698/44212183-101bbe80-a141-11e8-9c4c-dcf3269508e0.png");
    this.addRecieved(reactElementToJSXString(this.getRecieved(mess1)));
    this.addSent(mess1);
  }
  connectionsUpdate(e){
    this.setState({
      totcon: e.data
    });
  }
  messageRecievedEvent(e){
    var data = JSON.parse(e.data);
    var message = data['html'];
    this.addRecieved(message);
  }
  keyRecievedEvent(e){
    this.setState({
      key: e.data
    });
  }
  addRecieved(message) {
    var list = this.state.chatList;
    list.push(<div key={list.length} className="recMes" dangerouslySetInnerHTML={{__html : message}}/>);
    this.setState({ chatList: list });
  }
  getRecieved(message = new Message()){
    return<div>
    <span class="author">{message.state.author+`#${this.state.key.replace(/"/g,'')}`}</span>
    <div class="recMesChild">
    {message.state.image!=null ? message.state.image : ""}
    <br/>
    {message.state.text!=null?message.state.text:""}
    </div>
  </div>;
  }
  addSent(message = new Message()) {
    var list = this.state.chatList;
    var s = <div><div class="sentMes">
    {message.state.image!=null ? message.state.image : ""}
    <br/>
    {message.state.text!=null?message.state.text:""}
  </div></div>;
    list.push(<div key={list.length} className="cover" dangerouslySetInnerHTML={{__html : reactElementToJSXString(s)}}></div>)
    /*list.push(<div key={list.length} className="cover"><div className="sentMes">
      {message.state.image!=null ? message.state.image : ""}
      <br/>
      {message.state.text!=null?message.state.text:""}
    </div></div>);*/
    this.setState({ chatList: list });
  }
  sendMessage(){
    var text = this.state.messageText;
    var url = this.state.imageUrl;
    var message = new Message(localStorage.getItem('gusername'),false);
    message.setText(text);
    if(this.state.imageUrl.length>0)
      message.setImage(url);
    this.addSent(message);
    this.broadcastMessage(message);
    this.setState({
      imageUrl : '',
      messageText : ''
    });
  }
  broadcastMessage(message = new Message()){
    var data = {};
    data['html'] = reactElementToJSXString(this.getRecieved(message));
    data['key'] = this.state.key.replace(/"/g,'');
    var sendata = JSON.stringify(data);
    console.log(sendata);
    axios({
      method : 'POST',
      headers : {
        'Content-Type': 'text/plain'
      },
      url : 'http://ec2-13-235-246-42.ap-south-1.compute.amazonaws.com:3000/message',
      data : ''+sendata,
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.error(err);
    });
  }
  sendMessageClicked(event){
    this.sendMessage();
    event.preventDefault();
  }
  onChange(event){
    this.setState({
      messageText : event.target.value
    })
    event.preventDefault();
  }
  onKeyUp(event){
    if(event.key==="Enter"){
      this.sendMessage();
    }else{
      this.onChange(event);
    }
    event.preventDefault();
  }
  cambuttonClicked(event){
    this.imageinputRef.current.click();
    console.log('here');
    event.preventDefault();
  }
  hide(event){
    document.getElementsByClassName("imageView")[0].style.display = "none";
    document.getElementsByClassName("altimg main")[0].removeAttribute("src");
    event.preventDefault();
  }
  show(){
    document.getElementsByClassName("imageView")[0].style.display = "block";
  }
  imageChanged(event){
    var img = event.target.files[0];
    this.setState({
      imsrc : img
    });
    //console.log(img);
    var data = new FormData();
    data.append('source',img);
    data.append('type','file');
    data.append('action','upload');
    data.append('auth_token','59ac5d270f66858671b535579784e6dca2ec7fe3');
    data.append('expiration','PT1H');
    var options = {
      'method': 'POST',
      'url': 'https://cors-grayhat.herokuapp.com/https://imgbb.com/json',
      'headers': {
        'Accept': 'application/json'
        //'Origin': 'https://imgbb.com',
        //'Referer': 'https://imgbb.com/'
      },
      data: data
    };
    this.show();
    axios(options).then((res)=>{
      //console.log(res);
      this.setState({
        openimg: img,
        imageUrl: res.data.image.display_url
      });
      this.hide();
    }).catch(console.error);
    event.preventDefault();
  }
  render() {
    return(
    <div className="chatParent">
    <div className="imageView">
    <div className="imparent">
    <AiOutlineCloseCircle color="#8D79CD" className="close img button" onClick={this.hide}/>
    <img className="altimg main" alt="previewImage" />
    <img className="altimg" alt="loader" src={require('../assets/Ring-Loading.gif')} />
    </div>
    </div>
    <div className="topBar">
      <div>GrayBot</div>
      <div className="connections"><GoPrimitiveDot className="onlineIcon"/>{this.state.totcon.replace(/"/g,'')}</div>
    </div>
    <div className="chatConv">
      {this.state.chatList}
    </div>
    <div className="input-container">
    <input onChange={this.imageChanged} type="file" accept="image/png, image/jpeg" className="hiddenInput" ref={this.imageinputRef}/>
    <button className="cam-btn" onClick={this.cambuttonClicked}>
    <FcCamera className="cam-btn-icon"/>
    </button>
      <div className="input-box-send">
      <input type="text" maxLength="100" value={this.state.messageText} onChange={this.onChange} onKeyUp={this.onKeyUp} placeholder="Type a message" className="input-box">
      </input>
      <button className="send-btn" onClick={this.sendMessageClicked}>
      <MdSend size={30} className="send-btn-icon"/>
      </button>
      </div>
    </div>
    </div>);
  }
}
export default Chat;