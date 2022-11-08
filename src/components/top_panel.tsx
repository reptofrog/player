import styled from 'styled-components';


const TopPanel = (state: any): JSX.Element => {
    state = state.state;

    const changeScreen = (name: string) => {
        state.set((prevState: any) => {
            return {
                ...prevState,
                'currentScreen': name
            }
        });
    }

    return(
        <Panel>
            <Button
                className={`${state.get.currentScreen == 'songs' ? 'current' : ''}`}
                onClick={() => {changeScreen('songs')}}
                style={{width: '8.165rem'}}
            >
                Songs
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
                style={{width: '5.67833rem'}}
            >
                Edit
            </Button>
        </Panel>
    );
};

const Panel = styled.div`
    align-items: center;
    background: black;
    display: flex;
    gap: 3rem;
    height: 5rem;
    padding: 1rem 2rem;
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