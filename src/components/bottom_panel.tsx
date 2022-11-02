import styled from 'styled-components';

import RulerImg from '../../public/img/ruler.svg';


const BottomPanel = (): JSX.Element => {
    return(
        <Panel>
            <Slider>
                <ProgressWrapper>
                    <Progress>
                        <ProgressTextForeground>-999:99</ProgressTextForeground>
                    </Progress>
                </ProgressWrapper>
                <ProgressTextBackground>-999:99</ProgressTextBackground>
            </Slider>
            <Information>
                <TrackName>Boogie Oogie Oogie</TrackName>
                <ArtistName>Taste Of Honey</ArtistName>
                <PlayButton />
            </Information>
        </Panel>
    );
};

const Panel = styled.div`
    background: black;

    position: relative; /*Remove me*/
`;

const Slider = styled.div`
    background: url('${RulerImg}') black;
    height: 6.8rem;
    padding-inline: 3rem;
    cursor: col-resize;

    background-clip: content-box;
    background-origin: content-box;
    background-position-y: bottom;
    background-repeat: repeat-x;
`;

const ProgressWrapper = styled.div`
    position: relative;
    width: max-content;

    &:after {
        background: var(--accent);
        content: '';
        height: 4.8rem;
        position: absolute;
        right: 0;
        top: 100%;
        width: 0.6rem;
    }
`;

const Progress = styled.div`
    background: var(--accent);
    height: 2rem;
    min-width: 0.6rem;
    max-width: 30rem;
    overflow: hidden;
    position: relative;
    width: 5rem;
    z-index: 1;
`;

const ProgressTextForeground = styled.p`
    align-items: center;
    color: black;
    display: flex;
    font-family: "Europe-Ext-Bold";
    font-size: 1.4rem;
    height: 2rem;
    margin: 0;
    padding-inline: 0.75rem 0.6rem;
    user-select: none;
    width: max-content;
    margin-inline-start: auto;
`;

const ProgressTextBackground = styled.p`
    align-items: center;
    color: white;
    display: flex;
    font-family: "Europe-Ext-Bold";
    font-size: 1.4rem;
    height: 2rem;
    margin: 0;
    padding-inline-start: 0.75rem;
    position: absolute;
    top: 0;
    user-select: none;
`;

const Information = styled.div`
    
`;

const TrackName = styled.div``;

const ArtistName = styled.div``;

const PlayButton = styled.div``;

export default BottomPanel;