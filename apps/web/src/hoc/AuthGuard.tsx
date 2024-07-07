'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const admin = useAppSelector((state) => state.admin);
    const { id, role } = useAppSelector((state) => state.user);
    console.log(role, id);
    useEffect(() => {
      if (!id) {
        redirect(`/login`);
      } else if (role === 'CUSTOMER' && admin.warehouse) {
        redirect('/unauthorized');
      }
    }, [id, role]);

    return <Component {...props} />;
  };
}
