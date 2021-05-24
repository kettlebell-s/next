import { useSelector } from 'react-redux';
import { selectorUser, UserState } from '@redux/user.redux';
import { AppState } from '@components/Store';
import { connectToSocket } from '@services/socket';

export const useSocket = (authorizedOnly: boolean): SocketIOClient.Socket | null => {

  const user = useSelector<AppState, UserState>(selectorUser);
  return (!authorizedOnly || user) ? connectToSocket() : null;
};
