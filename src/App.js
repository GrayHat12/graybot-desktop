import React from 'react';
import Chat from './components/Chat';
import Player from './components/MusicPlayer';
import './App.css';

class App extends React.Component {
  state = {
    username : '',
    uinput : '',
  }
  constructor(){
    super();
    this.refresh = this.refresh.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    this.refresh();
  }
  refresh(){
    if(localStorage.getItem('gusername')!=null){
      this.setState({
        username : localStorage.getItem('gusername')
      });
    }
  }
  changeUsername(event){
    if(this.state.uinput.length>2){
      localStorage.setItem('gusername',this.state.uinput);
      this.refresh();
    }
    event.preventDefault();
  }
  onKeyDown(event){
    if(event.key==="Enter"){
      this.changeUsername(event);
    }else{
      this.onChange(event);
    }
    event.preventDefault();
  }
  onChange(event){
    this.setState({
      uinput : event.target.value
    });
    //console.log(this.state);
    event.preventDefault();
  }
  render(){
    return (
      <div className="App">
        {this.state.username.length===0?<div className="infoframe">
        <div className="frameContent">
        <h1 className="frameTitle">USERNAME</h1>
        <input maxLength="8" className="username" onKeyUp={this.onKeyDown} value={this.state.uinput} onChange={this.onChange}/>
        <button className="iframeSubmit" onClick={this.changeUsername}>CONTINUE</button>
        </div>
        </div>:""}
        <div className="chatArea">
          <Chat/>
        </div>
        <div className="divider"></div>
        <div className="youtubeArea">
          <Player/>
        </div>
      </div>
    );
  }
}

export default App;