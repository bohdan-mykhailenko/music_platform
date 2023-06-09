import { Grid, Input } from '@mui/material';
import React, { useRef } from 'react';
import styles from '../styles/FileUpload.module.scss';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
  const ref = useRef<null | HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<null | HTMLInputElement>) => {
    event.target.files instanceof FileList
      ? setFile(event.target.files[0]) : 'Handle exception';
  }

  return (
    <Grid 
      className={styles.wrapper}
      onClick={() => ref.current?.click()}
    >
      <input
        className={styles.fileLoader}
        type='file'
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </Grid >
  );
};

export default FileUpload;