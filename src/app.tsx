import styled from 'styled-components';
import { Fragment, useState, useEffect } from 'react';

import GlobalStyle from './global_style';

import BottomPanel from './components/bottom_panel';
import AddScreen from './components/add_screen';
import EditScreen from './components/edit_screen';
import RemovalScreen from './components/removal_screen';
import Playlist from './components/playlist';
import TopPanel from './components/top_panel';


const App = (): JSX.Element => {
    const [get, set] = useState(
        {
            'tracks': localStorage.getItem('tracks'),

            'currentScreen': 'songs',
            'selectedForEditingTrackID': null,
            'isMouseHeld': false,
            'playlistScroll': 0,

            'currentTrackID': localStorage.getItem('currentTrackID'),
            'isCurrentTrackPlaying': false,
            'currentTrackTimePercent': localStorage.getItem('currentTrackTimePercent'),
        }
    );

    useEffect(() => {
        localStorage.setItem('tracks', get.tracks as string);
        localStorage.setItem('currentTrackID', get.currentTrackID as string);
        localStorage.setItem('currentTrackTimePercent', get.currentTrackTimePercent as string);
    }, [get.tracks, get.currentTrackID, get.currentTrackTimePercent]);

    return(
        <Fragment>
            <GlobalStyle />
            <Main>
                <TopPanel state={{get, set}}/>
                {get.currentScreen == 'songs' || get.currentScreen == 'edit' ? <Playlist state={{get, set}}/> : <></>}
                {get.currentScreen == 'add' ? <AddScreen /> : <></>}
                <BottomPanel state={{get, set}}/>
            </Main>
        </Fragment>
    );
};

const Main = styled.main`
    background: #EEEEEE;
    overflow: hidden;
    width: 36rem;
`;

export default App;