import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const Player = (state: any): JSX.Element => {
    state = state.state;

    const player: any = useRef();
    const loadedTrackId: any = useRef(-1);
    const [effectDependencyTrigger, setEffectDependencyTrigger] = useState();

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: + state.get.isCurrentTrackPlaying,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0
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
        setEffectDependencyTrigger(!effectDependencyTrigger as any); // Triggering useEffect by changing a value

        const p = player.current.target;

        // This is needed so that playback is started even if user pressed the 'play' button before the player is loaded
        if(state.get.isCurrentTrackPlaying) {
            if(state.get.currentTrackID == loadedTrackId.current) {
                p.playVideo();
            } else {
                loadedTrackId.current = state.get.currentTrackID;
            }
        }
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
            // Check that the event was sent from the YouTube iFrame
            if(ev.source === iframeWindow) {
              var data = JSON.parse(ev.data);
        
              // The "infoDelivery" event is used by YT to transmit any
              // kind of information change in the player,
              // such as the current time or a playback quality change.
              if(
                data.event === "infoDelivery" &&
                data.info &&
                data.info.currentTime
              ) {
                let time = data.info.currentTime;
        
                console.log(time);
              }
            }
        } 

        if(player.current && player.current.target.getIframe()) {
            // This is the source "window" that will emit the events.
            var iframeWindow = player.current.target.getIframe().contentWindow;

            window.addEventListener('message', fun)
        }

        return () => {
            window.removeEventListener('message', fun)
        }
    }, [effectDependencyTrigger])

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