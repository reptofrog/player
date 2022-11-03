import styled from 'styled-components';
import { Fragment } from 'react';

import GlobalStyle from './global_style';

import BottomPanel from './components/bottom_panel';
import AddScreen from './components/add_screen';
import EditScreen from './components/edit_screen';
import RemovalScreen from './components/removal_screen';
import Playlist from './components/playlist';
import TopPanel from './components/top_panel';


const App = (): JSX.Element => {
    return(
        <Fragment>
            <GlobalStyle />
            <Main>
                <TopPanel />
                <Playlist />
                <BottomPanel />
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