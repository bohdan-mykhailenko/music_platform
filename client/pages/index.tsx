import { Button, Card, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Download from '../components/Download';
import Search from '../components/Search';
import Logo from '../components/Logo';
import TrackList from '../components/TrackList';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MainLayout from '../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchTracks, searchTracks } from '../store/action-creators/tracks';
import styles from '../styles/Index.module.scss';

const Index = () => {
  const { tracks, error } = useTypedSelector(state => state.track)

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Music platform'} >
      <Grid
        container
        className={styles.mainWrapper}>
        <Logo />
        <Grid
          container
          className={styles.wrapper}>
          <Search />
          <Download />
        </Grid>
        <TrackList tracks={tracks} />
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchTracks())
})