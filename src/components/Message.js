import React from 'react';
// eslint-disable-next-line no-useless-escape
const regex = /http[s]?:\/\/[^\.]*[^\s]*/g;
export default class Message {
  state = {
    incoming: false,
    text: null,
    image: '',
    author: null
  };
  constructor(author,incoming) {
    this.state.incoming = incoming;
    this.state.author = author;
    this.setImage = this.setImage.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.parseText = this.parseText.bind(this);
    this.setText = this.setText.bind(this);
  }
  setText(text) {
      this.state.text = this.parseText(text);
  }
  getUrl(url,key) {
      return(<a key={key} target="_blank" rel="noopener noreferrer" href={url}>{url}</a>);
  }
  parseText(text="") {
    var children = [];
    let m;
    while((m=regex.exec(text))!=null){
        var txt = <span key={children.length}>{text.substring(0,m.index)}</span>;
        children.push(txt);
        if(m[0]){
            var url = this.getUrl(m[0],children.length);
            children.push(url);
        }
        text = text.substring(m[0].length+m.index);
        regex.lastIndex = 0;
    }
    if(text.length>0){
        var txtt = <span key={children.length}>{text}</span>;
        children.push(txtt);
    }
    return <>{children}</>;
  }
  setImage(url){
      this.state.image = <img className="messageImage" src={url} alt="loading..."/>
  }
}