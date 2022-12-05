import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const Player = (state: any): JSX.Element => {
    state = state.state;

    const player: any = useRef();
    const loadedTrackId: any = useRef(-1);
    const shouldTimeBeSet: any = useRef(true); // Needed to remove a race condition
    const [effectDependencyTrigger, setEffectDependencyTrigger] = useState();

    const getVideoId = (id: any): string => {
        let i = '';
        
        if(state.get.tracks) {
            state.get.tracks.data.forEach((track: any) => {
                if(track.id == id) {
                    i = track.videoId;
                }
            });
        }

        return i;
    };

    const getCurrentTrackStartEndTime = (id: number) => {
        if(state.get.tracks && (state.get.currentTrackID != 'null' || !state.get.currentTrackID)) {
            const tracks = state.get.tracks.data;
            let result = null;

            tracks.forEach((track: any) => {
                if(track.id == id) {
                    result = {
                        startingTime: track.startingTime ? track.startingTime : 0,
                        endingTime: track.endingTime ? track.endingTime : -1
                    };  
                }
            })

            if(result) {
                return result;
            }
        }

        return {
            startingTime: 0,
            endingTime: -1
        };
    };

    const playerOnReady = (e: any) => {
        player.current = e;
        loadedTrackId.current = state.get.currentTrackID;
        setEffectDependencyTrigger(!effectDependencyTrigger as any); // Triggering useEffect by changing a value

        const p = player.current.target;

        // This is needed so that playback is started even if user pressed the 'play' button before the player is loaded
        if(state.get.isCurrentTrackPlaying) {
            if(state.get.currentTrackID == loadedTrackId.current) {
                state.set((prevState: any) => {
                    return {
                        ...prevState,
                        'playerPercentSeekTo': state.get.currentTrackTimePercent,
                    }
                });
            } else {
                loadedTrackId.current = state.get.currentTrackID;
            }
        }
    }

    const playerOnEnd = () => {
        const p = player.current.target;

        p.seekTo(0);
        p.pauseVideo();

        state.set((prevState: any) => {
            return {
                ...prevState,
                'currentTrackTimePercent': 0,
                'isCurrentTrackPlaying': false
            }
        });

        shouldTimeBeSet.current = false;
    }

    useEffect(() => {
        if(player.current) {
            const p = player.current.target;

            if(p.h){ // If 'h' is null, the player is not initialized fully
                if(state.get.isCurrentTrackPlaying) {
                    if(state.get.currentTrackID == loadedTrackId.current) {
                        state.set((prevState: any) => {
                            return {
                                ...prevState,
                                'playerPercentSeekTo': state.get.currentTrackTimePercent,
                            }
                        });

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
                
                /*console.log('T ' + time);*/

                const p = player.current.target;

                if(shouldTimeBeSet.current && !state.get.isMouseHeld) {
                    let startEndTime = getCurrentTrackStartEndTime(state.get.currentTrackID);
                    startEndTime.endingTime = startEndTime.endingTime == -1
                        ? p.getDuration()
                        : startEndTime.endingTime;

                    let percent = time / startEndTime.endingTime;
                    let timeLeft = startEndTime.endingTime - time;

                    state.set((prevState: any) => {
                        return {
                            ...prevState,
                            'currentTrackTimePercent': percent,
                            'currentTrackTimeLeftSeconds': timeLeft
                        }
                    });
                }
                
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

    useEffect(() => {
        shouldTimeBeSet.current = true;
    }, [state.get.isCurrentTrackPlaying])

    useEffect(() => {
        if(player.current) {
            const p = player.current.target;

            if(p.h){ // If 'h' is null, the player is not initialized fully
                if(state.get.playerPercentSeekTo || state.get.playerPercentSeekTo == 0) {
                    let startEndTime = getCurrentTrackStartEndTime(state.get.currentTrackID);

                    startEndTime.endingTime = startEndTime.endingTime == -1
                    ? p.getDuration()
                    : startEndTime.endingTime;

                    const seconds = startEndTime.endingTime * state.get.playerPercentSeekTo;

                    state.set((prevState: any) => {
                        return {
                            ...prevState,
                            'currentTrackTimePercent': state.get.playerPercentSeekTo,
                            'playerPercentSeekTo': null
                        }
                    });

                    p.seekTo(seconds); // FIXME: Time skipping on mouse press anywhere
                }
            }
        }
    }, [state.get.playerPercentSeekTo])

    const startEndTime = getCurrentTrackStartEndTime(state.get.currentTrackID);

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
            start: startEndTime.startingTime,
            end: startEndTime.endingTime
        },
    };

    return(
        <YouTube
            videoId={getVideoId(state.get.currentTrackID)}
            opts={opts}
            onReady={e => playerOnReady(e)}
            onEnd={() => playerOnEnd()}
            style={{
                display: 'none'
            }}
        />
    )
}

export default Player;