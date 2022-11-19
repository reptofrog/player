import YouTube from 'react-youtube';

const Player = (): JSX.Element => {
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          /*start end*/
        },
      };

    return(
        <YouTube videoId="2g811Eo7K8U" opts={opts} />
    )
}

export default Player;