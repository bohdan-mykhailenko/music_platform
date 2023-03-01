import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Player.module.scss'
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

let audio: HTMLAudioElement;

const Player = () => {
  const { tracks, error } = useTypedSelector(state => state.track)
  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()

  useEffect(() => {
    if (!pause) {
      if (!audio) {
        audio = new Audio()
      } else {
        setAudio()
        play()
      }
    }
  }, [active])

  useEffect(() => {
    if (active) {
      if (pause) {
        playAudio()
      } else {
        pauseAudio()
      }
    }

    console.log(pause)
  }, [pause])

  useEffect(() => {
    if (active) {
      if (!pause) {
        playTrack()
      } else {
        pauseTrack()
      }
    }

  }, [])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:7000/' + active.audio
      audio.autoplay = false
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        if (active && audio.currentTime != 0) {
          setCurrentTime(Math.ceil(audio.currentTime))
        } else if ((active && audio.currentTime == 0)) {
          audio.currentTime = currentTime
          setCurrentTime(currentTime)
        }
      }
    }
  }

  const timeFormatToSecMin = (time: number): string => {
    let seconds: number
    let minutes: number

    if (time >= 60) {
      minutes = (time - (time % 60)) / 60
      seconds = time % 60
    } else {
      minutes = 0
      seconds = time
    }
    if (seconds < 10) {
      return `0${minutes}:0${seconds}`
    }
    return `0${minutes}:${seconds}`
  }

  const play = () => {
    if (pause) {
      playTrack()
    } else {
      pauseTrack()
    }
  }

  const playAudio = async () => {
    setTimeout(function () {
      audio.play();
    }, 150);
  }

  const pauseAudio = async () => {
    return audio.pause()
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  if (!active || (!active && !audio.src)) {
    return null
  }

  if (audio && currentTime == duration) {
    audio.onended = () => {
      nextTrack();
    }
  }

  const nextTrack = (): void => {
    tracks.map((track, index) => {
      if (active._id == track._id) {
        playTrack()

        setTimeout(function () {
          if (active._id != tracks[tracks.length - 1]._id) {
            setActiveTrack(tracks[++index])
          } else {
            setActiveTrack(tracks[0])
          }
        }, 300);

        return
      }
    })
  }

  const previousTrack = (): void => {
    tracks.map((track, index) => {
      if (active._id == track._id) {
        playTrack()

        setTimeout(function () {
          if (active._id != tracks[0]._id) {
            setActiveTrack(tracks[--index])
          } else {
            setActiveTrack(tracks[tracks.length - 1])
          }
        }, 300);

        return
      }
    })
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={previousTrack}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={play}>
        {pause
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton>
      <IconButton onClick={nextTrack} >
        <ChevronRight />
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} currentTime={timeFormatToSecMin(currentTime)} duration={timeFormatToSecMin(duration)} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div >
  );
};

export default Player;