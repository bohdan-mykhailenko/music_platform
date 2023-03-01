import { Container } from '@mui/system';
import Head from 'next/head';
import React from 'react';
import Player from '../components/Player';
import styles from '../styles/MainLayout.module.scss'
import { Grid, IconButton } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>
          {title || 'Music platfrom'}
        </title>
        <meta name='description' content={'Music platfrom where you cam find any track in the world!' + description} />
        <meta name='robots' content='index, follow' />
        <meta name='keywords' content={keywords || 'Music, tracks, artists'} />
        <meta name='viewport' content={'width=device-width, initial-scale=1'} />
      </Head>
      <Grid className={styles.container}>
        {children}
      </Grid>
      <Player />
    </>
  );
};

export default MainLayout;