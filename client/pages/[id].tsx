import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../hooks/useInput';
import MainLayout from '../layouts/MainLayout';
import { ITrack } from '../types/track';
import { SERVER_URL } from '../consts/consts';

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
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push('/', undefined, { shallow: true })}
      >
        To list
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img src={SERVER_URL + track.picture} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h1>Track name - {track.name}</h1>
          <h1>Artist - {track.artist}</h1>
          <h1>listens - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>

        <TextField
          label="Username"
          fullWidth
          {...username}
        />
        <TextField
          label="Comment"
          {...text}
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div key={comment._id}>
            <div>Username - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        )}
      </div>
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