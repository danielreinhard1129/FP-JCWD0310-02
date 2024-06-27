'use client';
import { notification } from 'antd';
import React, { createContext, useContext } from 'react';

const NotificationContext = createContext<any>(undefined);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contexHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={api}>
      {contexHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const notificationApi = () => useContext(NotificationContext);
