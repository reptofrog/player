import styled from 'styled-components';


const RemovalScreen = (state: any): JSX.Element => {
    state = state.state;

    const changeScreen = (name: string) => {
        state.set((prevState: any) => {
            return {
                ...prevState,
                'currentScreen': name
            }
        });
    }

    const getTrackByID = (id: number) => {
        let tracks = state.get.tracks;

        if(!tracks) return ['—', '—']

        let track = tracks.data.filter((track: any) => {
            if(track.id == id) return true
            return false
        });

        console.log(track)

        return {
            trackName: track[0].trackName,
            artistName: track[0].artistName
        } as any
    }

    return(
        <Screen>
            <ScreenTitle>Are you sure you want to delete this track?</ScreenTitle>
            <Wrapper>
                <TrackName>{`${getTrackByID(state.get.selectedForEditingTrackID).trackName}`}</TrackName>
                <ArtistName>{`${getTrackByID(state.get.selectedForEditingTrackID).artistName}`}</ArtistName>
                <WrapperInner>
                    <Button>Yes</Button>
                    <Button
                        onClick={() => {changeScreen('edit')}}
                        className="delete"
                    >
                        No
                    </Button>
                </WrapperInner>
            </Wrapper>
        </Screen>
    )
};

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    height: 44.3rem;
    overflow: scroll;
    padding: 2rem;
    scrollbar-width: none;
    user-select: none;

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

const Wrapper = styled.div`
    margin-block-start: auto;
`;

const WrapperInner = styled.div`
    display: flex;
    gap: 2rem;
`;

const TrackName = styled.p`
    font-family: 'Helios-Bold';
    font-size: 2rem;
    line-height: 2.4rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-block-end: 0.5rem;
`;

const ArtistName = styled.p`
    font-family: 'Helios';
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-block-end: 2rem;
`;

const Button = styled.div`
        background: white;
        border-radius: 0.7rem;
        border: solid 0.1rem rgba(0, 0, 0, 0.10);
        box-shadow: 0px 0.05rem 0.2rem rgba(0, 0, 0, 0.05);
        cursor: pointer;
        flex: 1;
        font-size: 1.6rem;
        outline: solid 0.2rem rgba(0, 0, 0, 0); 
        padding: 0.5rem 1rem;
        text-align: center;
        transition: var(--animation);

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

    &.delete {
        background-color: var(--accent);
        margin-block-start: auto;
    }
`;

export default RemovalScreen;