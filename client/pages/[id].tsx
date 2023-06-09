import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../hooks/useInput';
import MainLayout from '../layouts/MainLayout';
import { ITrack } from '../types/track';
import { SERVER_URL } from '../consts/consts';
import styles from '../styles/[id].module.scss';

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const response = await axios.post(SERVER_URL + 'tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({ ...track, comments: [...track.comments, response.data] })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <MainLayout
      keywords={'Music, ' + track.name + ', ' + track.artist}
      title={'Music platform - ' + track.name + ' - ' + track.artist} >
      <Button
        onClick={() => router.push('/', undefined, { shallow: true })}
        className={styles.toList}
      >
        To list
      </Button>
      <Grid container style={{ margin: '20px 0' }} className={styles.container}>
        <img src={SERVER_URL + track.picture} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h2>Track name - {track.name}</h2>
          <h2>Artist - {track.artist}</h2>
          <h2>listens - {track.listens}</h2>
        </div>
      </Grid>
      <Grid className={styles.info}>
        <h2 className={styles.title}>Lyrics</h2>
        <p>{track.text}</p>
        <h2 className={styles.title}>Comments</h2>
        <Grid container>
          <TextField
            className={styles.textField}
            label="Username"
            fullWidth
            {...username}
          />
          <TextField
            className={styles.textField}
            label="Comment"
            {...text}
            fullWidth
            multiline
            rows={4}
          />
          <Button className={styles.button} onClick={addComment}>Send</Button>
        </Grid>
      </Grid>
      
      <Grid className={styles.comments}>
        {track.comments.map(comment =>
          <div key={comment._id}>
            <div className={styles.username}>Username - {comment.username}</div>
            <div className={styles.comment}>Comment - {comment.text}</div>
          </div>
        )}
      </Grid>
    </MainLayout >
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(SERVER_URL + 'tracks/' + params?.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}