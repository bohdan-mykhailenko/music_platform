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
      <Grid className={styles.container}>
        {children}
      </Grid>
      <Player />
    </>
  );
};

export default MainLayout;