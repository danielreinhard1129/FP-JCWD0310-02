'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const { id, role } = useAppSelector((state) => state.user);
    console.log(role, id);
    useEffect(() => {
      if (!id) {
        redirect(`/login`);
      } else if (role === 'CUSTOMER') {
        redirect('/unauthorized');
      }
    }, [id, role]);

    return <Component {...props} />;
  };
}

//   const role = useAppSelector((state) => state.user.role);
//   console.log(role);

//   if (role === 'CUSTOMER') {
//     redirect('/profiel' || '/');
//   } else {
//     redirect('/login' || '/');
//   }
//   return;
