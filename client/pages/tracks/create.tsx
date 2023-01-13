import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState('');
  const [audio, setAudio] = useState('');
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev: number) => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post('http://localhost:7000/tracks', formData)
        .then(response => router.push('/tracks'))
        .catch(error => alert(error))
    }
  }

  const back = () => {
    setActiveStep((prev: number) => prev - 1)
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction='column' style={{ padding: '20px' }}>
            <TextField
              {...name}
              label={'Track name'}
              style={{ marginTop: 10 }}>
            </TextField>
            <TextField
              {...artist}
              label={'Author'}
              style={{ marginTop: 10 }}>
            </TextField>
            <TextField
              {...text}
              label={'Lyrics'}
              multiline rows={3}
              style={{ marginTop: 10 }}>
            </TextField>
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload
            setFile={setPicture}
            accept="image/*"
          >
            <Button>Download image</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload
            setFile={setAudio}
            accept="audio/*"
          >
            <Button>Download track</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent={'space-between'}>
        <Button disabled={activeStep === 0} onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;