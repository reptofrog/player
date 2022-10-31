import styled from 'styled-components';

import RulerImg from '../../public/img/ruler.svg';


const BottomPanel = (): JSX.Element => {
    return(
        <Panel>
                <div style={{
                    width: "5%",
                    background: "cyan",
                    position: "relative",
                    height: "max-content",
                    minWidth: "0.6rem",
                    overflow: "hidden",
                    zIndex: "1"
                    
                }}>
                    <p style={{
                        color: "black",
                        margin: '0',
                        marginInlineStart: 'auto',
                        fontFamily: "Europe-Ext-Bold",
                        width: 'max-content',
                    }}>
                        -36:32
                    </p>
                    <div style={{
                        position: "absolute",
                        top: "100%",
                        right: "0",
                        background: "red",
                        width: "0.6rem",
                        height: "7rem",
                    }}></div>
                </div>
                <p style={{
                    position: "absolute",
                    fontFamily: "Europe-Ext-Bold",
                    margin: '0',
                    color: "white",
                    top: "0"
                }}>-36:32</p>
        </Panel>
    );
};

const Panel = styled.div`
    background: black;

    position: relative; /*Remove me*/
`;

const Slider = styled.div`
    background: url('${RulerImg}') black;
    height: 6rem;
    margin-inline: 3rem;

    background-position-y: bottom;
    background-repeat: repeat-x;
`;

export default BottomPanel;