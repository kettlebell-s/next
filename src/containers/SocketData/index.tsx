import React, { FunctionComponent } from 'react';
import { socketDataSelector } from '@redux/socket-data.redux';
import { useSelector } from 'react-redux';

const SocketData: FunctionComponent = () => {
  const data = useSelector(socketDataSelector);
  return (
    <div>
      <h4>{data.title}</h4>
      <p>{data.description}</p>
      <h6>{data.price}</h6>
    </div>
  );
};

export default SocketData;
