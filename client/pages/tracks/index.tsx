import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import TrackList from '../../components/TrackList';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks } from '../../store/action-creators/tracks';
import { ITrack } from '../../types/track';

const Index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

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

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(await fetchTracks())
})