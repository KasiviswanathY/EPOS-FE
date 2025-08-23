'use client';

import { Provider, useDispatch } from 'react-redux';
import { store } from '@/lib/redux/store';
import { useEffect } from 'react';
import { setUserFromLocal } from '@/lib/redux/slices/authSlice';
import Cookies from 'js-cookie';

function RehydrateRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenFromCookie = Cookies.get('auth-token'); 
    const user = localStorage.getItem('user');

    if (tokenFromCookie && user) {
      dispatch(setUserFromLocal({ token: tokenFromCookie, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RehydrateRedux />
      {children}
    </Provider>
  );
}
