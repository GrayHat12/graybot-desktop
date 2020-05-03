import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import './song.css';

export default class Card extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        ;
    }
    render(){
        return(<div className="cardView">
            <div className="cardImage">
                <div className="imgContainer">
                    <img className="cardimg img" src="https://i.ytimg.com/vi/gdLLRj1Ge7g/hq720.jpg" alt="thumbnail"/>
                    <BsFillPlayFill className="playIcon"/>
                </div>
            </div>
            <div className="cardTitle" title="NF Intro III (Audio)">
                <span className="Vidtitle" >NF Intro III (Audio)</span>
            </div>
            <div className="cardAuthor" title="NFrealmusic 🎵">
                <div className="authorWrapper">
                    <img className="channelImg" src="https://yt3.ggpht.com/a-/AOh14GiiKly74fjv54azYd597O05JB9B6Ds8oE7HltOV8g=s88-c-k-c0x00ffffff-no-rj" alt="channel"/>
                    <span className="vidAuthor">NFrealmusic 🎵</span>
                </div>
            </div>
        </div>);
    }
}