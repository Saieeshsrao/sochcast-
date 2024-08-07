// import React, { useRef } from 'react';
// import '../index.css';
// import { useEffect } from 'react';
// const AudioPlayer = ({ audioUrl, onPlay, onEnded, autoPlay }) => {
//   const audioRef = useRef(null);

//     useEffect(() => {
//     if (autoPlay) {
//       audioRef.current.play();
//     }
//   }, [autoPlay]);

//   const handlePlay = () => {
//     audioRef.current.play();
//     if (onPlay) {
//       onPlay();
//     }
//   };

//   return (
//     <div className="audio-player">
//       <audio ref={audioRef} src={audioUrl} controls onEnded={onEnded}
//         onPlay={handlePlay}   />
//       {/* <button onClick={handlePlay}>Play</button> */}
//     </div>
//   );
// };

// export default AudioPlayer;
import React, { useContext, useEffect, useRef } from 'react';
import { Store } from '../context/Store';
import { SET_PLAYING, SET_CURRENT_TIME, SET_DURATION } from '../context/actions';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import '../index.css';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
const CustomAudioPlayer = () => {
  const { state, dispatch } = useContext(Store);
  const audioRef = useRef(null);

  useEffect(() => {
    if (state.playing && audioRef.current) {
      audioRef.current.audio.current.play();
    } else if (audioRef.current) {
      audioRef.current.audio.current.pause();
    }
  }, [state.playing, state.currentEpisode]);

  if (!state.currentEpisode) {
    return null;
  }

  console.log("episooodes",state.episodes)  ;
  const handlePrevious = () => {
   
};

const handleNext = () => {
   
};
  const togglePlay = () => {
    dispatch({ type: SET_PLAYING, payload: !state.playing });
  };

  const handlePlay = () => {
    dispatch({ type: SET_PLAYING, payload: true });
  };

  const handlePause = () => {
    dispatch({ type: SET_PLAYING, payload: false });
  };

  const handleTimeUpdate = (e) => {
    dispatch({ type: SET_CURRENT_TIME, payload: e.target.currentTime });
  };

  const handleLoadedMetadata = (e) => {
    dispatch({ type: SET_DURATION, payload: e.target.duration });
  };

  return (
    <div className="audio-player">
      <div className="now-playing-info">
        <img src={state.currentEpisode.episode_image} alt={state.currentEpisode.name} className="now-playing-image" />
        <div className="now-playing-details">
          <h3>{state.currentEpisode.name}</h3>
          <p>{state.currentEpisode.show_name}</p>
        </div>
      </div>
      <AudioPlayer
        ref={audioRef}
        src={state.currentEpisode.file}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        customAdditionalControls={[]}
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[
          RHAP_UI.ADDITIONAL_CONTROLS,
          
          <StepBackwardOutlined style={{ color: 'white', fontSize: '40px' }} onClick={handlePrevious} />,
          RHAP_UI.MAIN_CONTROLS,
          <StepForwardOutlined style={{ color: 'white', fontSize: '40px' }} onClick={handleNext} />,
          RHAP_UI.VOLUME_CONTROLS,
       
        
        ]}
       
     
      />
     
    </div>
  );
};

export default CustomAudioPlayer;