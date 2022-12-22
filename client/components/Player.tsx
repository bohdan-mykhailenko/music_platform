import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';
interface PlayerProps {

}

const Player: React.FC<PlayerProps> = () => {
  const active = false;
  const track: ITrack = { _id: '1', name: 'Track1', artist: 'A1', text: 'Text1', listens: '5', audio: 'http://localhost:7000/audio/98b16e9d-9ef8-4845-96cb-2fde32641ee6.mp3', picture: 'http://localhost:7000/image/c1f368bb-5c8b-4ff6-bbdb-22356bed8436.png', comments: [] }
  return (
    <div className={styles.player}>
      <IconButton onClick={event => event.stopPropagation()}>
        {active
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton >
      <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => ({})}></TrackProgress>
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={0} right={100} onChange={() => ({})}></TrackProgress>
    </div>
  );
};

export default Player;