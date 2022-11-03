import styled from 'styled-components';


const EditScreen = (): JSX.Element => {
    return(
        <Screen>
            <ScreenTitle>Add any video from YouTube to your playlist</ScreenTitle>
            <Cell>
                <Title>Video link</Title>
                <Input placeholder='Required'></Input>
            </Cell>
            <Cell>
                <Title>Starting time</Title>
                <Input placeholder='—'></Input>
            </Cell>
            <Cell>
                <Title>Ending time</Title>
                <Input placeholder='—'></Input>
            </Cell>
            <Button>Add to playlist</Button>
        </Screen>
    )
};

const Screen = styled.div`
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

const Cell = styled.div`
    align-items: center;
    background: white;
    border: solid 0.1rem #DFDFDF;
    display: flex;
    height: 5.3rem;
    margin-inline: -2rem;

    border-inline-start-width: 0;
    border-inline-end-width: 0;

    &:nth-of-type(1) {
        margin-block-end: 1rem;
    }

    &:nth-of-type(2) {
        border-block-end-width: 0;
    }

`;

const Title = styled.p`
    font-family: 'Helios-Bold';
    font-size: 1.6rem;
    margin: 0;
    width: 12rem;

    margin-inline-start: 1.5rem;
`;

const Input = styled.input`
    border: none;
    flex: 1;
    font-family: 'Helios';
    font-size: 1.6rem;
    height: 100%;
    outline: none;
`;

const Button = styled.div`
    background: white;
    border-radius: 0.6rem;
    border: solid 0.1rem rgba(0, 0, 0, 0.10);
    box-shadow: 0px 0.05rem 0.2rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-size: 1.6rem;
    margin-block-start: 2rem;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0); 
    padding: 0.6rem 1rem;
    transition: var(--animation);
    width: max-content;

    outline-offset: -0.2rem;

    &:hover {
        background: black;
        box-shadow: none;
        color: white;
    }
`;

export default EditScreen;