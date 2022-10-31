import styled from 'styled-components';


const TopPanel = (): JSX.Element => {
    return(
        <Panel>
            <Button>Songs</Button>
            <Button>Add</Button>
            <Button className='aside'>Edit</Button>
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
    transition: var(--animation);
    user-select: none;

    outline-offset: -0.2rem;

    &:hover {
        color: var(--accent);
        outline-offset: -0.2rem;
        outline: solid 0.2rem var(--accent);
    }

    &.aside {
        margin-inline-start: auto;
    }
`;

export default TopPanel;