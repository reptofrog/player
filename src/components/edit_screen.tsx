import styled from 'styled-components';


const EditScreen = (): JSX.Element => {
    return(
        <Screen>
            <Title>Add any video from YouTube to your playlist</Title>
            <Cell>
                <CellTitle></CellTitle>
                <CellInput></CellInput>
            </Cell>
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

const Title = styled.p`
    font-family: 'Helios-Ext';
    font-size: 2rem;
    margin: 0;
`;

export default EditScreen;