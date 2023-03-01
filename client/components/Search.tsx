import { Button, Card, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch, wrapper } from '../store';
import { searchTracks } from '../store/action-creators/tracks';
import styles from '../styles/Search.module.scss'

const Search = () => {
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch

  const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    await dispatch(searchTracks(event.target.value))
  }

  return (
    <Grid
      item
      className={styles.searchContainer}>
      <TextField
        placeholder='Searching...'
        className={styles.search}
        value={query}
        onChange={search}
      />
    </Grid >
  );
}



export default Search;
