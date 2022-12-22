import React from 'react';
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/MainLayout';

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className='center'>
          <h1>Welcome</h1>
          <h3>You can find the best tracks here!</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
        .center {
          margin-top: 150px;
          flex-direction: column;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        `}
      </style>
    </>
  );
};

export default Index;