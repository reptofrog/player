import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import RulerImg from '../../public/img/ruler.svg';
import PlayImg from '../../public/img/play.svg';
import PauseImg from '../../public/img/pause.svg';


const BottomPanel = (state: any): JSX.Element => {
    state = state.state;

    const progressRef = useRef<HTMLDivElement>(null);

    const [x, setX] = useState(0);

    const calculateAndSetX = (e: MouseEvent) => {
        if(state.get.currentTrackID != 'null' || !state.get.currentTrackID) {
            const boundingClientRect = progressRef.current!.getBoundingClientRect();
            setX(e.pageX - boundingClientRect.left);
            setX(prevX => prevX + 3);
            setX(prevX => Math.max(0, prevX));
            setX(prevX => Math.min(300, prevX));
        }
    }

    const sliderMouseDownHandler = (e: React.MouseEvent): void => {
        state.set((prevState: any) => {
            return {
                ...prevState,
                'isMouseHeld': true
            }
        });
        document.body.style.cursor = 'col-resize';
        calculateAndSetX(e as unknown as MouseEvent);
    }

    const windowMouseUpHandler = (): void => {
        if(state.get.isMouseHeld) {
            state.set((prevState: any) => {
                return {
                    ...prevState,
                    'isCurrentTrackPlaying': true,
                    'playerPercentSeekTo': x / 300,
                }
            });
        }

        state.set((prevState: any) => {
            return {
                ...prevState,
                'isMouseHeld': false,
            }
        });
        document.body.style.cursor = 'unset';
    }

    const windowMouseMoveHandler = (e: MouseEvent): void => {
        if(state.get.isMouseHeld) {
            calculateAndSetX(e);
        }
    }

    const playButtonClickHandler = () => {
        if(state.get.currentTrackID != 'null' || !state.get.currentTrackID) {
            state.set((prevState: any) => {
                return {
                    ...prevState,
                    'isCurrentTrackPlaying': !state.get.isCurrentTrackPlaying
                }
            });
        }
    }

    const getTrackInfo = (id: number) => {
        if(state.get.tracks && (state.get.currentTrackID != 'null' || !state.get.currentTrackID)) {
            const tracks = state.get.tracks.data;
            let result = null;

            tracks.forEach((track: any) => {
                if(track.id == id) {
                    result = {
                        title: track.trackName,
                        subtitle: track.artistName
                    };  
                }
            })

            if(result) {
                return result;
            }
        }

        return {
            title: 'No track selected',
            subtitle: 'Choose any track from the playlist'
        };
    }

    useEffect(() => {
        function mouseMoveListener(e: any) {
            // This is needed so that we refer to the same place in memory
            windowMouseMoveHandler(e);
        }

        window.addEventListener('mousemove', mouseMoveListener);
        window.addEventListener('mouseup', windowMouseUpHandler);
        
        if(!state.get.isMouseHeld && !state.get.playerPercentSeekTo && state.get.playerPercentSeekTo != 0) {
            // Song progress must not be updated while a user interacts with the slider
            setX(state.get.currentTrackTimePercent * 300);
        }

        return () => {
            window.removeEventListener('mousemove', mouseMoveListener);
            window.removeEventListener('mouseup', windowMouseUpHandler);
        }
    });

    const timeLeft = new Date(1000 * state.get.currentTrackTimeLeftSeconds).toISOString().substring(14, 19);

    if(state.get.currentScreen != 'edit') {
        return(
            <Panel>
                <Slider
                    onMouseDown={sliderMouseDownHandler}
                    >
                    <ProgressWrapper
                        className={`${state.get.isCurrentTrackPlaying ? 'playing' : ''}`}
                    >
                        <Progress
                            ref={progressRef}
                            style={{width: `${x / 10}rem`}}
                            className={`${state.get.isCurrentTrackPlaying ? 'playing' : ''}`}
                        >
                            <ProgressTextForeground>-{timeLeft}</ProgressTextForeground>
                        </Progress>
                    </ProgressWrapper>
                    <ProgressTextBackground>-{timeLeft}</ProgressTextBackground>
                </Slider>
                <Information>
                    <InfoTitle>{getTrackInfo(state.get.currentTrackID).title}</InfoTitle>
                    <InfoSubtitle>{getTrackInfo(state.get.currentTrackID).subtitle}</InfoSubtitle>
                    <PlayButton
                        isCurrentTrackPlaying={state.get.isCurrentTrackPlaying}
                        onClick={playButtonClickHandler}
                    />
                </Information>
            </Panel>
        )
    } else {
        return(
            <Panel>
                <Information>
                    <InfoTitle className="withMargin">You are editing the playlist</InfoTitle>
                    <InfoSubtitle>Tap a track to edit</InfoSubtitle>
                    <PlayButton
                        isCurrentTrackPlaying={state.get.isCurrentTrackPlaying}
                        onClick={playButtonClickHandler}
                    />
                </Information>
            </Panel>
        )
    }
};

const Panel = styled.div`
    background: black;
    position: relative;
    user-select: none;
`;

const Slider = styled.div`
    background: url('${RulerImg}') black;
    height: 6.8rem;
    padding-inline: 3rem;
    cursor: col-resize;

    background-clip: content-box;
    background-origin: content-box;
    background-position-y: bottom;
    background-repeat: repeat-x;
`;

const ProgressWrapper = styled.div`
    position: relative;
    width: max-content;

    &:after {
        background: #858585;
        content: '';
        height: 4.8rem;
        inset-inline-end: 0;
        position: absolute;
        top: 100%;
        transition: var(--animation);
        width: 0.6rem;

        transition-property: background;
    }

    &.playing:after {
        background-color: var(--accent);
    }
`;

const Progress = styled.div`
    background: #858585;
    height: 2rem;
    line-height: 0;
    max-width: 30rem;
    min-width: 0.6rem;
    overflow: hidden;
    position: relative;
    transition: var(--animation);
    z-index: 1;

    transition-property: background;

    &.playing {
        background-color: var(--accent);
    }
`;

const ProgressTextForeground = styled.p`
    align-items: center;
    color: black;
    display: flex;
    font-family: "Europe-Ext-Bold";
    font-size: 1.4rem;
    height: 2rem;
    margin: 0;
    padding-inline: 0.75rem 0.6rem;
    width: max-content;
    margin-inline-start: auto;
`;

const ProgressTextBackground = styled.p`
    align-items: center;
    color: white;
    display: flex;
    font-family: "Europe-Ext-Bold";
    font-size: 1.4rem;
    height: 2rem;
    margin: 0;
    padding-inline-start: 0.75rem;
    position: absolute;
    top: 0;
`;

const Information = styled.div`
    padding: 1rem;
`;

const InfoTitle = styled.p`
    color: white;
    font-family: "Helios-Bold";
    font-size: 1.6rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.withMargin {
        margin-block-end: 0.5rem;
    }
`;

const InfoSubtitle = styled.p`
    color: white;
    font-family: "Helios";
    font-size: 1.4rem;
    margin: 0;
    max-width: 33ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

interface Props {
    isCurrentTrackPlaying: boolean
}

const PlayButton = styled.div<Props>`
    background: ${(props): any => {
            if(props.isCurrentTrackPlaying) {
                return `url('${PauseImg}') #DCDCDC;`
            } else {
                return `url('${PlayImg}') var(--accent);`
            }
        }
    };
    border-radius: 100rem;
    cursor: pointer;
    height: 2.9rem;
    margin-block: -0.3rem 0;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    transition: var(--animation);
    width: 7.3rem;

    background-position: ${(props): any => {return props.isCurrentTrackPlaying ? '50%': '53%'}} 47%;
    background-repeat: no-repeat;
    outline-offset: -0.2rem;

    &:hover {
        outline: solid 0.2rem var(--accent);
        outline-offset: 0.2rem;
    }

    &:active {
        background-color: ${(props): any => {return props.isCurrentTrackPlaying ? '#DCDCDC' : 'var(--accent)'}};
        outline: solid 0.2rem rgba(0, 0, 0, 0); 

        outline-offset: -0.2rem;
    }
`;

export default BottomPanel;