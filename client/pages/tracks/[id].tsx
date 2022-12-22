import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';


const TrackPage: React.FC = () => {
  const router = useRouter()
  const track: ITrack = { _id: '1', name: 'Track1', artist: 'A1', text: 'Text1', listens: '5', audio: 'http://localhost:7000/audio/98b16e9d-9ef8-4845-96cb-2fde32641ee6.mp3', picture: 'http://localhost:7000/image/c1f368bb-5c8b-4ff6-bbdb-22356bed8436.png', comments: [] }

  return (
    <MainLayout>
      <Button
        style={{ fontSize: 32 }}
        variant={'outlined'}
        onClick={() => router.push('/tracks/')}>
        To list
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img width={200} height={200} src={track.picture} />
        <div style={{ margin: '20px 0' }}>
          <h1>Name - {track.name}</h1>
          <h1>Artist- {track.artist}</h1>
          <h1>Listens - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Lyrics</h1>
      <p>{track.text}</p>
      <Grid container>
        <h1>Comments</h1>
        <TextField label='Name' fullWidth>
        </TextField>
        <TextField label='Comment' fullWidth multiline rows={4}>
        </TextField>
        <Button>
          Send
        </Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div key={comment._id}>
            <div>Autrhor - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;