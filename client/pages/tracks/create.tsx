import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev: number) => prev + 1)
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
            <TextField label={'Track name'} style={{ marginTop: 10 }}>

            </TextField>
            <TextField label={'Author'} style={{ marginTop: 10 }}>

            </TextField>
            <TextField label={'Lyrics'} multiline rows={3} style={{ marginTop: 10 }}>

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