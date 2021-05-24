import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { showToast } from '@containers/common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from '@constants/toast.constants';
import { SocketDataDTO } from '@dtos/socketData.dto';
import { updateData } from '@redux/socket-data.redux';

let socketIo: SocketIOClient.Socket;
export const connectToSocket: () => SocketIOClient.Socket | null = () => {
  const dispatch = useDispatch();
  if (!socketIo) {
    socketIo = io.connect('http://localhost:9000');

    socketIo.on('connect', () => {
      showToast(`Connected to socket: ${socketIo.id}`, TOAST_SUCCESS);
    });

    socketIo.once('connect_error', () => {
      showToast('Can not connect to socket!', TOAST_WARNING);
    });

    socketIo.once('disconnect', () => {
      showToast('Disconnected from socket!', TOAST_ERROR);
    });

    //  This is the example of how to create Socket Events:
    //      1. Register new Event with first argument as the name of Event
    //      2. The second argument is the callback function with param that WSS server response with
    //      3. Handle arrived data with Redux Action to save it to the store
    socketIo.on('data', (data: SocketDataDTO) => {
      dispatch(updateData(data));
    });
    return socketIo;
  }
  return null;
};

export const disconnectFromSocket = (socket: SocketIOClient.Socket): void => {
  socket.disconnect();
};
