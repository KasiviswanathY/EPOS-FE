'use client';

import { Provider ,useDispatch } from 'react-redux';
import { store } from '@/lib/redux/store';
import { useEffect } from 'react';
import { setUserFromLocal } from '@/lib/redux/slices/authSlice';
function RehydrateRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setUserFromLocal({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return null; // Just for side effect
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
