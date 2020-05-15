import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import './song.css';
import axios from "axios";
const Item = require('gtube/lib/Item');

export default class Card extends React.Component {
    state = {
        item: new Item(),
        authorThumb: require('../assets/Ring-Loading.gif'),
        videoInfo : {}
    }
    constructor(props){
        super();
    }
    componentDidMount(){
        this.state.item.setData(this.props.card.data);
        /*this.state.item.getBasicItemData().then((val)=>{
            this.setState({
                videoInfo: val,
                authorThumb: val['author']['avatar']
            });
            console.log('val',val);
        }).catch((err)=>{
            console.error(err);
            //console.log('err',this.state.item.data);
        });*/
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
    componentWillUnmount(){
    }
    render(){
        return(<div className="cardView">
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