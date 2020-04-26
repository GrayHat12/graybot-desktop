import React from 'react';
import Song from '../utilities/Song';

class Player extends React.Component {
    state = {
        songList : [],
        currentlyPlaying : new Song(),
    }
    componentDidMount(){
        ;
    }
    render(){
        return(<div>PLAYER</div>)
    }
}
export default Player;