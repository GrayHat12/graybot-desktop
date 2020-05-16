import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import './song.css';
import axios from "axios";
const Item = require('gtube/lib/Item');

export default class Card extends React.Component {
    state = {
        item: new Item(),
        authorThumb: require('../assets/Ring-Loading.gif'),
        videoInfo : undefined,
        isPlaying : false,
        selectedFormat: null,
        audio: new Audio(),
    }
    constructor(props){
        super();
        this.clicked = this.clicked.bind(this);
        this.getBestAudio = this.getBestAudio.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }
    componentDidMount(){
        this.state.item.setData(this.props.card.data);
        this.setState({
            item: this.state.item
        });
        var data = this.state.item.data;
        var thumb = data.thumbnail;
        thumb = thumb.replace('hqdefault','maxresdefault');
        axios.get(thumb).then((res)=>{
            if(res.status == 200){
                data.thumbnail = thumb;
                this.setState({
                    item: new Item(data)
                });
            }
        });
        axios.get(this.state.item.data.link+'&pbj=1',{headers:{
            'Accept-Encoding': 'gzip',
            'x-youtube-client-name': '1',
            'x-youtube-client-version': '2.20200508.00.01'
          }}).then((res)=>{
            var dataa = res.data;
            //console.log(dataa);
            try{
                dataa = dataa[3]['playerResponse']['endscreen']['endscreenRenderer']['elements'];
                dataa = dataa[0]['endscreenElementRenderer']['image']['thumbnails'][0]['url'];
                dataa = dataa.substring(0,dataa.indexOf('='));
                axios.get(dataa).then((ress)=>{
                    if(ress.status==200){
                        this.setState({
                            authorThumb: dataa
                        });
                    }
                });
            }catch(err){
                console.log(err,res.data);
                dataa = res.data;
                dataa = dataa[3]['response']['contents']['twoColumnWatchNextResults']['results']['results']['contents'][1];
                dataa = dataa['videoSecondaryInfoRenderer']['owner']['videoOwnerRenderer']['thumbnail']['thumbnails'][0]['url'];
                dataa = dataa.substring(0,dataa.indexOf('='));
                axios.get(dataa).then((ress)=>{
                    if(ress.status==200){
                        this.setState({
                            authorThumb: dataa
                        });
                    }
                });
            }
        }).catch(console.error);
    }
    getBestAudio(val){
        console.log('bestaudio',val);
        var formats = val['formats'];
        var format = formats[0];
        for(var i=0;i<formats.length;i++){
            var cformat = formats[i];
            if(typeof cformat['audioBitrate']=='number' && typeof format['audioBitrate']=='number'){
                if(cformat['audioBitrate']>format['audioBitrate']){
                    format = cformat;
                }
            }
            if(typeof format['audioBitrate']=='undefined'){
                format = cformat;
            }
        }
        this.setState({
            selectedFormat : format
        });
    }
    play(event){
        console.log('play');
        this.setState({
            isPlaying: true
        });
        this.state.audio.play();
    }
    pause(event){
        console.log('pause');
        this.setState({
            isPlaying: false
        });
        this.state.audio.pause();
    }
    clicked(event){
        console.log('clicked');
        if(typeof this.state.videoInfo != 'undefined' && this.state.isPlaying==false) return this.play(event);
        if(this.state.isPlaying == true) return this.pause(event);
        this.state.item.getItemData().then((val)=>{
            console.log('got val',val);
            this.setState({
                videoInfo: val
            });
            this.getBestAudio(val);
            this.setState({
                audio: new Audio(this.state.selectedFormat['url'])
            });
            this.state.audio.addEventListener('canplaythrough',this.play);
        }).catch(console.error);
        event.preventDefault();
    }
    render(){
        return(<div className="cardView" onClick={this.clicked}>
            <div className="cardImage">
                <div className="imgContainer">
                    <img className="cardimg img" src={this.state.item.data.thumbnail} alt="thumbnail"/>
                    <BsFillPlayFill className="playIcon"/>
                </div>
            </div>
            <div className="cardTitle" title={this.state.item.data.title}>
                <span className="Vidtitle" >{this.state.item.data.title}</span>
            </div>
            <div className="cardAuthor" title={this.state.item.data.author.name}>
                <div className="authorWrapper">
                    <img className="channelImg" src={this.state.authorThumb} alt="channel"/>
                    <span className="vidAuthor">{this.state.item.data.author.name}</span>
                </div>
            </div>
        </div>);
    }
}