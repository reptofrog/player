import styled from 'styled-components';
import { Fragment } from 'react';

import GlobalStyle from './global_style';

import TopPanel from './components/top_panel';
import Tracklist from './components/tracklist';
import BottomPanel from './components/bottom_panel';


const App = (): JSX.Element => {
    return(
        <Fragment>
            <GlobalStyle />
            <Main>
                <TopPanel />
                <Tracklist />
                <BottomPanel />
            </Main>
        </Fragment>
    );
};

const Main = styled.main`
    background: #EEEEEE;
    width: 36rem;
`;

export default App;