import { Card, IconButton, Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter()
  const { setIsFirstPageLoadAction, playTrack, pauseTrack, setActiveTrack } = useActions();
  const { isFirstPageLoad, pause, volume, duration, active, currentTime } = useTypedSelector(state => state.player)
  const { tracks, error } = useTypedSelector(state => state.track)

  useEffect(() => {
    if (active) {
      if (pause) {
        playTrack()
      } else {
        pauseTrack()
      }
      setActiveTrack(active);
      check()
    } else {
      setIsFirstPageLoadAction(false)
    }
  }, [])

  // useEffect(() => {
  //   console.log(pause)
  //   if (active === track) {
  //     console.log(active)
  //     console.log("AAAA")
  //     console.log(track)
  //   }
  // }, [pause])


  const check = () => {
    tracks.map((trackItem) => {
      if (trackItem._id == active?._id && trackItem._id == track._id) {
        setIsFirstPageLoadAction(true)
        return
      }
    }
    )
  }

  const play = (event: any) => {
    if (event) {

    }
    event.stopPropagation();
    if (active?._id == track._id) {
      if (pause) {
        playTrack()
      } else {
        pauseTrack()
      }
      return
    }
    setActiveTrack(track);
    playTrack()
  }

  return (
    <Card className={styles.track} onClick={() => {
      router.push('/tracks/' + track._id, undefined, { shallow: true });
    }}>
      <IconButton onClick={play} style={{ padding: '50px' }}>
        {active === track || (isFirstPageLoad && track._id == active?._id)
          ? <div>
            {pause
              ? <Pause />
              : <PlayArrow />
            }
          </div>
          : <div>
            <PlayArrow />
          </div>
        }
      </IconButton >
      <img width={70} height={70} src={'http://localhost:7000/' + track.picture} />
      <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      <IconButton style={{ marginLeft: 'auto' }} onClick={event => event.stopPropagation()} >
        <Delete />
      </IconButton>
    </Card >
  );
};

export default TrackItem;


//2:02:41