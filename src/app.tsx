import styled from 'styled-components';
import { Fragment, useState, useEffect } from 'react';

import GlobalStyle from './global_style';

import BottomPanel from './components/bottom_panel';
import AddScreen from './components/add_screen';
import EditScreen from './components/edit_screen';
import RemovalScreen from './components/removal_screen';
import Playlist from './components/playlist';
import TopPanel from './components/top_panel';
import Player from './components/player';


const App = (): JSX.Element => {
    const [get, set] = useState(
        {
            'tracks': JSON.parse(localStorage.getItem('tracks') || 'null'),

            'currentScreen': 'editTrack', // playlist, add, edit, editTrack, remove
            'selectedForEditingTrackID': null,
            'isMouseHeld': false,
            'playlistScroll': 0,

            'currentTrackID': localStorage.getItem('currentTrackID'),
            'isCurrentTrackPlaying': false,
            'currentTrackTimePercent': localStorage.getItem('currentTrackTimePercent'),
            'currentTrackTimeLeftSeconds': localStorage.getItem('currentTrackTimeLeftSeconds') || '0', // Used to show how much time of a track is left
            'playerPercentSeekTo': null,
            
            'isTrackInfoBeingLoaded': false,
        }
    );

    useEffect(() => {
        localStorage.setItem('currentTrackID', get.currentTrackID as string);
        localStorage.setItem('currentTrackTimePercent', get.currentTrackTimePercent as string);
        localStorage.setItem('currentTrackTimeLeftSeconds', get.currentTrackTimeLeftSeconds as any);
    }, [get.currentTrackID, get.currentTrackTimePercent, get.currentTrackTimeLeftSeconds]);

    useEffect(() => {
        function initTracks() {
            set((prevState: any) => {
                return {
                    ...prevState,
                    'tracks': require('./init_data.json')
                }
            });
        }

        if(get.tracks == 'null' || !get.tracks) {
            initTracks();
        } else {
            localStorage.setItem('tracks', JSON.stringify(get.tracks));
            if(get.tracks.data.length == 0) {
                initTracks();
            } 
        }
    }, [get.tracks])

    return(
        <Fragment>
            <GlobalStyle />
            <Player state={{get, set}}/>
            <Main>
                <TopPanel state={{get, set}}/>
                {
                    get.currentScreen == 'playlist' || get.currentScreen == 'edit'
                        ? <Playlist state={{get, set}}/>
                        : <></>
                }
                {
                    get.currentScreen == 'add'
                        ? <AddScreen state={{get, set}}/>
                        : <></>
                }
                {
                    get.currentScreen == 'remove'
                        ? <RemovalScreen state={{get, set}}/>
                        : <></>
                }
                <BottomPanel state={{get, set}}/>
            </Main>
        </Fragment>
    );
};

const Main = styled.main`
    background: #EEEEEE;
    display: flex;
    flex-direction: column;
    height: 64rem;
    overflow: hidden;
    width: 36rem;
`;

export default App;