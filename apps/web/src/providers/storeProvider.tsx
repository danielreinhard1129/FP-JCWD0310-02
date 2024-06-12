'use client';
import React from 'react';
import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
import { useRef } from 'react';
import { makeStore, AppStore } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<h1>Loading...</h1>}
        persistor={persistStore(storeRef.current)}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
