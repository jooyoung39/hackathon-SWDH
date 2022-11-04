import { useAppDispatch, useAppSelector } from './useStore';
import { setToken } from '../reducers/userSlice';
import { useRefreshTokenMutation } from '../services/careusAPI';

const useAuth = () => {
  const storeDispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  const [refreshToken] = useRefreshTokenMutation();
  const { token } = userData;

  let isExpired = false;

  const fetchWithAuth = (request: any) => {
    try {
      request(token);
    } catch {
      console.log('expired');
      isExpired = true;
      refreshToken(token)
        .unwrap()
        .then((TokenData) => {
          storeDispatch(setToken(TokenData));
        });
    } finally {
      if (isExpired) {
        console.log('re_fetch');

        request(token);
      } else {
        console.log('not_re_fetch');
      }
    }
  };

  return fetchWithAuth;
};

export default useAuth;
