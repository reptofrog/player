import styled from 'styled-components';

import RulerImg from '../../public/img/ruler.svg';
import PlayImg from '../../public/img/play.svg';
import PauseImg from '../../public/img/pause.svg';


const BottomPanel = (): JSX.Element => {
    return(
        <Panel>
            <Slider>
                <ProgressWrapper>
                    <Progress>
                        <ProgressTextForeground>-00:00</ProgressTextForeground>
                    </Progress>
                </ProgressWrapper>
                <ProgressTextBackground>-00:00</ProgressTextBackground>
            </Slider>
            <Information>
                <InfoTitle>Boogie Oogie Oogie</InfoTitle>
                <InfoSubtitle>A Taste Of Honey</InfoSubtitle>
                <PlayButton />
            </Information>
        </Panel>
    );
};

const Panel = styled.div`
    background: black;
    position: relative;
    user-select: none;
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
        inset-inline-end: 0;
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
`;

const Information = styled.div`
    padding: 1rem;
`;

const InfoTitle = styled.p`
    color: white;
    font-family: "Helios-Bold";
    font-size: 1.6rem;
    margin: 0;
`;

const InfoSubtitle = styled.p`
    color: white;
    font-family: "Helios";
    font-size: 1.4rem;
    margin: 0;
`;

const PlayButton = styled.div`
    background: url('${PauseImg}') #DCDCDC;
    border-radius: 100rem;
    cursor: pointer;
    height: 2.9rem;
    margin-block: -0.3rem 0;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    transition: var(--animation);
    width: 7.3rem;

    background-position: center 47%;
    background-repeat: no-repeat;
    outline-offset: -0.2rem;

    &:hover {
        outline: solid 0.2rem var(--accent); 
        outline-offset: 0.2rem;
    }
`;

export default BottomPanel;