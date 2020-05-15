import React from "react";
import Card from "./SongCard";
import "./player.css";

const Gtube = require('gtube');
const Item = require('gtube/lib/Item');

class Player extends React.Component {
  state = {
    songList: [],
    currentlyPlaying: new Item(),
    gtube: new Gtube("nf songs")
  };
  searching = false;
  constructor(){
    super();
    this.cleared = this.cleared.bind(this);
    this.songAdded = this.songAdded.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.initialise = this.initialise.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.continueSearch = this.continueSearch.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }
  componentDidMount() {
    this.initialise();
  }
  trackScrolling(ev) {
    const wrappedElement = document.getElementById('musicViewArea');
    console.log('track');
    if (this.isBottom(wrappedElement)) {
      this.continueSearch();
      console.log('scrolled to bottom');
    }
  };
  initialise(){
    this.state.gtube.on("cleared",this.cleared);
    console.log('here0');
    this.state.gtube.on("addedItem",this.songAdded);
    console.log('here1');
    this.state.gtube.process(true);
    this.searching = true;
  }
  cleared(){
    console.log('cleared');
    this.setState({
      songList: []
    });
  }
  continueSearch(){
    if(this.searching)return;
    this.state.gtube.process(false);
  }
  onSearch(event){
    if(event.key == 'Enter' && event.target.value.length>0 && this.searching == false){
      this.state.gtube._search = event.target.value;
      console.log(this.state.gtube);
      this.state.gtube.process(true);
      this.searching = true;
    }
  }
  songAdded(item){
    var itemList = this.state.songList;
    this.searching = false;
    var card = <Card key={itemList.length} card={item}/>
    itemList.push(card);
    this.setState({
      songList: itemList
    });
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="playerParent">
        <div className="playerChildmain">
          <div className="MptopBar">
            <div>Music Service</div>
          </div>
          <div className="searchArea">
            <input className="searchBar" onKeyDown={this.onSearch} placeholder="Search"></input>
          </div>
          <div className="musicViewArea" id="musicViewArea">
            {this.state.songList}
          </div>
        </div>
        <div className="playerChildPlaying">
            <div className="cpcontainer">
                <div className="cpthumb">
                    <img className="cpthumb img" src="https://i.ytimg.com/vi/gdLLRj1Ge7g/hq720.jpg" alt="thumb" />
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default Player;