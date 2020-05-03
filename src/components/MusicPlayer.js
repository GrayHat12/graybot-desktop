import React from "react";
import Song from "../utilities/Song";
import Card from './SongCard';
import "./player.css";

class Player extends React.Component {
  state = {
    songList: [],
    currentlyPlaying: new Song(),
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <div className="MptopBar">
          <div>Music Service</div>
        </div>
        <div className="searchArea">
            <input className="searchBar" placeholder="Search"></input>
        </div>
        <div className="musicViewArea">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
      </div>
    );
  }
}
export default Player;
