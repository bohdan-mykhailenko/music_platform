import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Download.module.scss'

const Download = () => {
  const router = useRouter()

  return (
    <Grid item justifyContent='space-between' className={styles.container}>
      <Button className={styles.button} onClick={() => router.push('/create')}>
        Download
      </Button>
    </Grid >
  );
}

export default Download;
