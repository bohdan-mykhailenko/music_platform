import { Card, IconButton, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SERVER_URL } from '../consts/consts';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter()
  const { setIsFirstPageLoadAction, playTrack, pauseTrack, setActiveTrack, setDuration } = useActions();
  const { isFirstPageLoad, pause, duration, active } = useTypedSelector(state => state.player)
  const { tracks, error } = useTypedSelector(state => state.track)
  const src = SERVER_URL + track.picture


  useEffect(() => {
    if (active) {
      if (pause) {
        playTrack()
      } else {
        pauseTrack()
      }

      setActiveTrack(active)
      setDuration(duration)
      checkIsFirstPageLoadAction()

    } else {
      setIsFirstPageLoadAction(false)
    }

  }, [])


  const checkIsFirstPageLoadAction = () => {
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
    <Card className={styles.track}>
      <IconButton className={styles.icon} onClick={play} style={{ padding: '50px' }}>
        {active === track || (isFirstPageLoad && track._id == active?._id)
          ? <div>
            {pause
              ? <Pause fontSize='large' />
              : <PlayArrow fontSize='large' />
            }
          </div>
          : <div>
            <PlayArrow fontSize='large' />
          </div>
        }
      </IconButton >
      <Image 
        onClick={() => router.push('/' + track._id, undefined, { shallow: true })}
        className={styles.image} 
        width={100} height={100} 
        loader={() => src} src={src} 
        alt="track image" 
      />
      <Grid className={styles.info} container direction='column' >
        <div className={styles.name}>{track.name}</div>
        <div className={styles.artist} >{track.artist}</div>
      </Grid>
      {/* <IconButton style={{ marginLeft: 'auto' }} onClick={event => event.stopPropagation()} >
        <Delete />
      </IconButton> */}
    </Card >
  );
};

export default TrackItem;
