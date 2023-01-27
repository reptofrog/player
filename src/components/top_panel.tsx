import styled from 'styled-components';


const TopPanel = (state: any): JSX.Element => {
    state = state.state;

    const changeScreen = (name: string) => {
        if(!state.get.isTrackBeingAdded) {
            state.set((prevState: any) => {
                return {
                    ...prevState,
                    'currentScreen': name
                }
            });
        }
    }

    if(
        state.get.currentScreen == 'playlist' || 
        state.get.currentScreen == 'add' || 
        state.get.currentScreen == 'edit'
    ) {
        return(
            <Panel className={`${state.get.isTrackInfoBeingLoaded == true ? 'inactive' : ''}`}>
                <Button
                    className={`${state.get.currentScreen == 'playlist' ? 'current' : ''}`}
                    onClick={() => {changeScreen('playlist')}}
                    style={{width: '8.423rem'}}
                >
                    Tracks
                </Button>
                <Button
                    className={`${state.get.currentScreen == 'add' ? 'current' : ''}`}
                    onClick={() => {changeScreen('add')}}
                    style={{width: '5.765rem'}}
                >
                    Add
                </Button>
                <Button
                    className={
                        `${state.get.currentScreen == 'edit' ? 'current' : ''} aside`
                    }
                    onClick={() => {changeScreen('edit')}}
                    style={{width: '5.678rem'}}
                >
                    Edit
                </Button>
            </Panel>
        );
    } else if(state.get.currentScreen == 'add') {
        return(
            <Panel>
                <Button
                    className={
                        `${state.get.currentScreen == 'edit' ? 'current' : ''} aside`
                    }
                    onClick={() => {changeScreen('edit')}}
                >
                    Close
                </Button>
            </Panel>
        );
    } else {
        return(
            <Panel>

            </Panel>
        );
    }
};

const Panel = styled.div`
    align-items: center;
    background: black;
    display: flex;
    gap: 3rem;
    height: 5rem;
    min-height: 5rem;
    padding: 1rem 2rem;
    transition: var(--animation);

    &.inactive {
        filter: brightness(0.5);
        pointer-events: none;
    }
`;

const Button = styled.div`
    border-radius: 100rem;
    color: white;
    cursor: pointer;
    font-family: 'Helios-Ext-Bold';
    font-size: 1.6rem;
    margin: -0.6rem -1rem;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    padding: 0.6rem 1rem;
    text-align: center;
    transition: var(--animation);
    user-select: none;

    outline-offset: -0.2rem;

    &:not(.current):hover {
        color: var(--accent);
        outline: solid 0.2rem var(--accent);

        outline-offset: -0.2rem;
    }

    &:not(.current):active {
        background-color: var(--accent);
        color: black;
        outline-offset: -0.2rem;
        outline: solid 0.2rem var(--accent);
    }

    &.aside {
        margin-inline-start: auto;
    }

    &.current {
        background: #858585;
        color: black;
        font-family: 'Helios-Ext';
    }
`;

export default TopPanel;