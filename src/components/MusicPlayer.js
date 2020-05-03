import React from "react";
import Song from "../utilities/Song";
import Card from "./SongCard";
import "./player.css";

class Player extends React.Component {
  state = {
    songList: [],
    currentlyPlaying: new Song(),
  };
  componentDidMount() {}
  render() {
    return (
      <div className="playerParent">
        <div className="playerChildmain">
          <div className="MptopBar">
            <div>Music Service</div>
          </div>
          <div className="searchArea">
            <input className="searchBar" placeholder="Search"></input>
          </div>
          <div className="musicViewArea">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
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
