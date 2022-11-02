import styled from 'styled-components';


const Playlist = (): JSX.Element => {
    return(
        <List>
            <Track>
                <TrackName>Boogie Oogie Oogie</TrackName>
                <ArtistName>A Taste Of Honey</ArtistName>
            </Track>
            <Track>
                <TrackName>Boogie Oogie Oogie</TrackName>
                <ArtistName>A Taste Of Honey</ArtistName>
            </Track>
            <Track>
                <TrackName>Boogie Oogie Oogie</TrackName>
                <ArtistName>A Taste Of Honey</ArtistName>
            </Track>
            <Track>
                <TrackName>Boogie Oogie Oogie</TrackName>
                <ArtistName>A Taste Of Honey</ArtistName>
            </Track>
        </List>
    );
};

const List = styled.div`
    height: 44.3rem;
    overflow: scroll;
    scrollbar-width: none;
    user-select: none;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const Track = styled.div`
    cursor: pointer;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    padding-block: 1rem 0.8rem;
    padding-inline: 1rem;
    transition: var(--animation);

    outline-offset: -0.3rem;

    &:nth-of-type(even) {
        background: #DFDFDF;
    }

    &:hover {
        background: white;
        outline-offset: 0;
        outline: solid 0.3rem rgba(0, 0, 0, 0);
    }

    &:active {
        background: var(--accent);
        outline-offset: -0.3rem;
        outline: solid 0.3rem var(--accent);
    }
`;

const TrackName = styled.p`
    color: black;
    font-family: "Helios-Bold";
    font-size: 1.6rem;
    margin: 0;
`;

const ArtistName = styled.p`
    color: black;
    font-family: "Helios";
    font-size: 1.4rem;
    margin: 0;
`;

export default Playlist;