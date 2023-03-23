import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import styles from '../styles/Logo.module.scss'
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface LogoProps {

}

class Logo extends React.Component<LogoProps> {

  render() {
    return (
      <Grid className={styles.container} container>
        {<IconButton className={styles.iconButton}>
          <MusicNoteIcon className={styles.icon} fontSize='large' />
        </IconButton>}
        <h1 className={styles.title}>Flada Music</h1>
        {<IconButton className={styles.iconButton}>
          <MusicNoteIcon className={styles.icon} fontSize='large' />
        </IconButton>}
      </Grid>
    );
  }
}


export default Logo;
