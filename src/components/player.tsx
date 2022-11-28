import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const Player = (state: any): JSX.Element => {
    state = state.state;

    const player: any = useRef();
    const loadedTrackId: any = useRef(-1);

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: + state.get.isCurrentTrackPlaying,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            /*start end*/
        },
    };

    const getVideoId = (id: any): string => {
        let i = '';
        
        state.get.tracks.data.forEach((track: any) => {
            if(track.id == id) {
                i = track.videoId;
            }
        });

        return i;
    };

    const playerOnReady = (e: any) => {
        player.current = e;
        loadedTrackId.current = state.get.currentTrackID;

        const p = player.current.target;
    }

    useEffect(() => {
        if(player.current) {
            const p = player.current.target;

            if(p.h){ // If 'h' is null, the player is not initialized fully
                if(state.get.isCurrentTrackPlaying) {
                    if(state.get.currentTrackID == loadedTrackId.current) {
                        p.playVideo();
                    } else {
                        loadedTrackId.current = state.get.currentTrackID;
                    }
                    
                } else {
                    p.pauseVideo();
                }
            }
            
        }
    }, [state.get.isCurrentTrackPlaying])

    useEffect(() => {
        function fun(ev: any) {
            console.log('a');
        } 

        window.addEventListener('message', fun)

        return window.removeEventListener('message', fun)
    }, [state.get.currentTrackID])

    return(
        <YouTube
            videoId={getVideoId(state.get.currentTrackID)}
            opts={opts}
            onReady={e => playerOnReady(e)}
            style={{
                display: 'none'
            }}
        />
    )
}

export default Player;