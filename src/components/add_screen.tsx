// @ts-nocheck  

import { useRef } from 'react';
import styled from 'styled-components';

import InputMask from 'react-input-mask';
import YouTube from 'react-youtube';


const AddScreen = (state: any): JSX.Element => {
    state = state.state;

    const linkRef = useRef();
    const startingTimeRef = useRef(null);
    const endingTimeRef = useRef(null);

    const screenSubmitHandler = (e: any) => {
        e.preventDefault();

        const regexp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const match = linkRef.current.value.match(regexp);
        if(match) {
            const Id = match[1];

            state.set((prevState: any) => {
                return {
                    ...prevState,
                    'isTrackInfoBeingLoaded': true,
                }
            });
            fetch(`https://noembed.com/embed?url=${match[0]}`)
                .then(response => {
                    response.json().then(data => {
                        let tracks = state.get.tracks.data;
                        const lastTrackId = tracks[tracks.length - 1].id;

                        let startingTime = startingTimeRef.current.value;
                        startingTime = (parseInt(startingTime.substring(0, 2)) || 0) * 60 + (parseInt(startingTime.substring(4, 6)) || 0);
                        startingTime = startingTime === 0 ? null : startingTime;

                        let endingTime = endingTimeRef.current.value;
                        endingTime = (parseInt(endingTime.substring(0, 2)) || 0) * 60 + (parseInt(endingTime.substring(4, 6)) || 0);
                        endingTime = endingTime === 0 ? null : endingTime;

                        tracks.push({
                            'id': lastTrackId + 1,
                            'startingTime': null,//startingTime, TODO: start/end time is broken in player.tsx
                            'endingTime': null, //endingTime,
                            'trackName': data.title,
                            'artistName': data.author_name,
                            'videoId': Id
                        })

                        state.set((prevState: any) => {
                            return {
                                ...prevState,
                                'currentScreen': 'playlist',
                                'isTrackInfoBeingLoaded': false,
                                'tracks': {
                                    'data': [
                                        ...tracks
                                    ]
                                }
                            }
                        });
                    });
                })
                .catch(() => {
                    state.set((prevState: any) => {
                        return {
                            ...prevState,
                            'isTrackInfoBeingLoaded': false,
                        }
                    });
                })
        }
    };

    return(
        <Screen
            onSubmit={e => screenSubmitHandler(e)}
            className={`${state.get.isTrackInfoBeingLoaded == true ? 'inactive' : ''}`}
        >
            <ScreenTitle>Add any video from YouTube to your playlist</ScreenTitle>
            <Cell>
                <Title>Video link</Title>
                <Input
                    placeholder='Required'
                    ref={linkRef}
                />
            </Cell>
            <Cell>
                <Title>Starting time</Title>
                <InputMask 
                    placeholder='—'
                    mask="99m 99s"
                >
                    <Input ref={startingTimeRef} />
                </InputMask>
            </Cell>
            <Cell>
                <Title>Ending time</Title>
                <InputMask 
                    placeholder='—'
                    mask="99m 99s"
                >
                    <Input ref={endingTimeRef} />
                </InputMask>
            </Cell>
            <Button>Add to playlist</Button>
        </Screen>
    )
};

const Screen = styled.form`
    height: 100%;
    overflow: scroll;
    padding: 2rem;
    scrollbar-width: none;
    transition: var(--animation);
    user-select: none;

    &.inactive {
        opacity: 0.5;
        pointer-events: none;
    }

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const ScreenTitle = styled.p`
    font-family: 'Helios-Ext';
    font-size: 2rem;
    line-height: 2.4rem;
    margin: 0;

    margin-block-end: 2rem;
`;

const Cell = styled.div`
    align-items: center;
    background: white;
    border: solid 0.1rem #DFDFDF;
    display: flex;
    height: 5.3rem;
    margin-inline: -2rem;

    border-inline-start-width: 0;
    border-inline-end-width: 0;

    &:nth-of-type(1) {
        margin-block-end: 1rem;
    }

    &:nth-of-type(2) {
        border-block-end-width: 0;
    }

`;

const Title = styled.p`
    font-family: 'Helios-Bold';
    font-size: 1.6rem;
    margin: 0;
    width: 12rem;

    margin-inline-start: 1.5rem;
`;

const Input = styled.input`
    border: none;
    flex: 1;
    font-family: 'Helios';
    font-size: 1.6rem;
    height: 100%;
    outline: none;
`;

const Button = styled.button`
    background: white;
    border-radius: 0.7rem;
    border: solid 0.1rem rgba(0, 0, 0, 0.10);
    box-shadow: 0px 0.05rem 0.2rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    display: block;
    font-family: 'Helios';
    font-size: 1.6rem;
    margin-block-start: 2rem;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0); 
    padding: 0.5rem 1rem;
    transition: var(--animation);
    width: max-content;

    outline-offset: -0.2rem;

    &:hover {
        outline-offset: 0.2rem;
        outline: solid 0.2rem rgba(0, 0, 0, 0.7); 
    }

    &:active {
        background: black !important;
        box-shadow: none;
        color: white;
        outline-offset: -0.2rem;
    }
`;

export default AddScreen;