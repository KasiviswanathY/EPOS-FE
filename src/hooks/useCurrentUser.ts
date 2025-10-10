import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../lib/redux/store';
import { getCurrentUser } from '../lib/redux/actions/userActions';

export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading, error } = useSelector((state: RootState) => state.users);

  const fetchCurrentUser = useCallback(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const getCurrentUserFromState = () => currentUser;

  return {
    currentUser,
    loading,
    error,
    fetchCurrentUser,
    getCurrentUserFromState,
  };
};

export default useCurrentUser;
