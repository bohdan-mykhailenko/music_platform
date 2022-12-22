import React, { useRef } from 'react';

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
    <div onClick={() => ref.current?.click()}>
      <input
        type='file'
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div >
  );
};

export default FileUpload;