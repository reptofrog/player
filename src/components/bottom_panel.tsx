import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import RulerImg from '../../public/img/ruler.svg';
import PlayImg from '../../public/img/play.svg';
import PauseImg from '../../public/img/pause.svg';


const BottomPanel = (state: any): JSX.Element => {
    state = state.state;

    const progressRef = useRef<HTMLDivElement>(null);

    const x = useRef(0);

    const sliderMouseDownHandler = (e: React.MouseEvent): void => {
        state.set((prevState: any) => {
            return {
                ...prevState,
                'isMouseHeld': true
            }
        });
        document.body.style.cursor = 'col-resize';
        windowMouseMoveHandler(e as unknown as MouseEvent); // So that pos. would change on click
    }

    const windowMouseUpHandler = (): void => {
        state.set((prevState: any) => {
            return {
                ...prevState,
                'isMouseHeld': false
            }
        });
        document.body.style.cursor = 'unset';
    }

    const windowMouseMoveHandler = (e: MouseEvent): void => {
        console.log(state.get.isMouseHeld);
        if(state.get.isMouseHeld) {
            const boundingClientRect = progressRef.current!.getBoundingClientRect();
            x.current = e.pageX - boundingClientRect.left;
            x.current += 3;
            x.current = Math.max(0, x.current);
            x.current = Math.min(300, x.current);

            progressRef.current!.style.width = x.current / 10 + 'rem'; // TODO: Remove me
        }
    }

    useEffect((): void => {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            windowMouseMoveHandler(e);
        });

        window.addEventListener('mouseup', () => {
            windowMouseUpHandler();
        });
    }, []);

    return(
        <Panel>
            <Slider
                onMouseDown={sliderMouseDownHandler}
            >
                <ProgressWrapper>
                    <Progress ref={progressRef}>
                        <ProgressTextForeground>-00:00</ProgressTextForeground>
                    </Progress>
                </ProgressWrapper>
                <ProgressTextBackground>-00:00</ProgressTextBackground>
            </Slider>
            <Information>
                <InfoTitle>No track is playing</InfoTitle>
                <InfoSubtitle>Select any track from the playlist</InfoSubtitle>
                <PlayButton />
            </Information>
        </Panel>
    );
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
        position: absolute;
        inset-inline-end: 0;
        top: 100%;
        width: 0.6rem;
    }
`;

const Progress = styled.div`
    background: #858585;
    height: 2rem;
    min-width: 0.6rem;
    max-width: 30rem;
    overflow: hidden;
    position: relative;
    width: 0rem;
    z-index: 1;
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

    margin-block-end: 0.2rem;
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

const PlayButton = styled.div`
    background: url('${PlayImg}') var(--accent);
    border-radius: 100rem;
    cursor: pointer;
    height: 2.9rem;
    margin-block: -0.3rem 0;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    transition: var(--animation);
    width: 7.3rem;

    background-position: 53% 47%;
    background-repeat: no-repeat;
    outline-offset: -0.2rem;

    &:hover {
        outline: solid 0.2rem var(--accent); 
        outline-offset: 0.2rem;
    }

    &:active {
        background-color: #DCDCDC;
        outline: solid 0.2rem rgba(0, 0, 0, 0); 

        outline-offset: -0.2rem;
    }
`;

export default BottomPanel;