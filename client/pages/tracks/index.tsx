import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import TrackList from '../../components/TrackList';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const Index = () => {
  const router = useRouter()
  const tracks: ITrack[] = [
    { _id: '1', name: 'Track1', artist: 'A1', text: 'Text1', listens: '5', audio: 'http://localhost:7000/audio/98b16e9d-9ef8-4845-96cb-2fde32641ee6.mp3', picture: 'http://localhost:7000/image/c1f368bb-5c8b-4ff6-bbdb-22356bed8436.png', comments: [] },
    { _id: '2', name: 'Track3', artist: 'A1', text: 'Text2', listens: '5', audio: 'http://localhost:7000/audio/98b16e9d-9ef8-4845-96cb-2fde32641ee6.mp3', picture: 'http://localhost:7000/image/c1f368bb-5c8b-4ff6-bbdb-22356bed8436.png', comments: [] },
    { _id: '3', name: 'Track3', artist: 'A1', text: 'Text3', listens: '5', audio: 'http://localhost:7000/audio/98b16e9d-9ef8-4845-96cb-2fde32641ee6.mp3', picture: 'http://localhost:7000/image/c1f368bb-5c8b-4ff6-bbdb-22356bed8436.png', comments: [] },
  ]
  return (
    <MainLayout>
      <Grid container>
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>
                Tracks list
              </h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Dowload
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;