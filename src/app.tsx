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
            'tracks': JSON.parse(localStorage.getItem('tracks') || 'null'),

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
        localStorage.setItem('currentTrackID', get.currentTrackID as string);
        localStorage.setItem('currentTrackTimePercent', get.currentTrackTimePercent as string);
    }, [get.currentTrackID, get.currentTrackTimePercent]);

    useEffect(() => {
        if(get.tracks == 'null' || !get.tracks) {
            set((prevState: any) => {
                return {
                    ...prevState,
                    'tracks': require('./init_data.json')
                }
            });
        } else {
            localStorage.setItem('tracks', JSON.stringify(get.tracks));
        }
    }, [get.tracks])

    return(
        <Fragment>
            <GlobalStyle />
            <Main>
                <TopPanel state={{get, set}}/>
                {
                    get.currentScreen == 'songs' || get.currentScreen == 'edit'
                        ? <Playlist state={{get, set}}/>
                        : <></>
                }
                {
                    get.currentScreen == 'add'
                        ? <AddScreen />
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