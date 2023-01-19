import { Button, Card, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/tracks';
import { ITrack } from '../../types/track';

const Index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState('')

  const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //   
    //   if (timer) {
    //     clearTimeout(timer)
    //   }
    //   setTimer(
    //     setTimeout(async () => {
    //       
    //     }, 500)
    //   )
    setQuery(event.target.value)
    await dispatch(await searchTracks(event.target.value))
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Track list - music platform'}>
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
          <TextField
            fullWidth
            value={query}
            onChange={search}
          />
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