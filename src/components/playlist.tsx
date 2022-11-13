import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import CloseImg from '../../public/img/close.svg';


const Playlist = (state: any): JSX.Element => {
    state = state.state;

    const listRef = useRef<HTMLDivElement>(null);

    const listScrollHandle = (e: any) => {
        let currentTarget = e.currentTarget;
        state.set((prevState: any) => {
            return {
                ...prevState,
                'playlistScroll': currentTarget.scrollTop
            }
        });
    };

    const removalButtonClickHandler = (e: any) => {
        
    }

    useEffect(() => {
        listRef.current!.scrollTo(0, state.get.playlistScroll);
    }, [])

    const getTracks = (): any => {
        let tracks = state.get.tracks;
        if(tracks) {
            tracks = tracks.data;
            return state.get.tracks.data.map((track: any) => {
                return(
                    <Track key={track.id}>
                        <RemovalButton
                            currentScreen={state.get.currentScreen}
                            onClick={removalButtonClickHandler}
                        />
                        <TrackName>{track.trackName}</TrackName>
                        <ArtistName>{track.artistName}</ArtistName>
                    </Track>
                )
            })
        } else {
            return <></>
        }
    };

    return(
        <List
            onScroll={listScrollHandle}
            ref={listRef}
        >
            {getTracks()}
        </List>
    );
};

const List = styled.div`
    height: 100%;
    overflow: scroll;
    scrollbar-width: none;
    user-select: none;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const Track = styled.div`
    cursor: pointer;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    padding-block: 1rem;
    padding-inline: 1rem;
    transition: var(--animation);
    position: relative;

    outline-offset: -0.3rem;

    &:nth-of-type(even) {
        background: #DFDFDF;
    }

    &:hover {
        background: white;
        outline-offset: 0;
        outline: solid 0.3rem rgba(0, 0, 0, 0);
    }

    &:active {
        background: var(--accent);
        outline-offset: -0.3rem;
        outline: solid 0.3rem var(--accent);
    }
`;

const TrackName = styled.p`
    color: black;
    font-family: "Helios-Bold";
    font-size: 1.6rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    margin-block-end: 0.2rem;
`;

const ArtistName = styled.p`
    color: black;
    font-family: "Helios";
    font-size: 1.4rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

interface Props {
    currentScreen: string
}

const RemovalButton = styled.div<Props>`
    background: url('${CloseImg}');
    border-radius: 100rem;
    display: ${(props): any => {return props.currentScreen == 'edit' ? 'unset': 'none'}};
    float: right;
    height: 3rem;
    margin: 0.35rem 0 0.35rem 0;
    pointer-events: ${(props): any => {return props.currentScreen == 'edit' ? 'unset': 'none'}};
    transition: var(--animation);
    width: 3rem;

    background-position: center;
    background-repeat: no-repeat;
    
    &:hover {
        background-color: white;
        filter: invert(1);
    }

    &:active {
        background-color: var(--accent);
        filter: invert(0);
    }
`;

export default Playlist;