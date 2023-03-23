import React from 'react';

interface TrackProgressProps {
  left: number;
  right: number;
  currentTime?: string;
  duration?: string;
  onChange: (event: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange, currentTime, duration }) => {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type='range'
        min={0}
        max={right}
        value={left}
        onChange={onChange} />
      <div>
        {duration &&
          <div>{currentTime}{'/' + duration}</div>
        }</div>
    </div>
  );
};

export default TrackProgress;