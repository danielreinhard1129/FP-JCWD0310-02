'use client';

import useAxios from '@/hooks/useAxios';
import { useGoogleLogin } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';

const useGoogleAuth = () => {
  const { axiosInstance } = useAxios();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('/auth/google', { code });

        const { data } = response;

        console.log('Login successful, server response:', data);
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    flow: 'auth-code',
  });

  return { googleLogin };
};

export default useGoogleAuth;

// // import { useEffect } from 'react';
// // import useAxios from '@/hooks/useAxios';
// // import { useGoogleLogin } from '@react-oauth/google';

// // const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// // const useGoogleAuth = () => {
// //   const { axiosInstance } = useAxios();

// //   const googleLogin = useGoogleLogin({
// //     // clientId: googleClientId,
// //     onSuccess: async ({ code }) => {
// //       try {
// //         const response = await axiosInstance.post('/auth/google', { code });

// //         const { data } = response;

// //         console.log('Login successful, server response:', data);
// //       } catch (error) {
// //         // console.error('Error during Google login:', error.response.data);
// //       }
// //     },
// //     flow: 'auth-code',
// //   });

// //   useEffect(() => {
// //     if (googleClientId === undefined) {
// //       console.error('Google Client ID is not defined.');
// //     }
// //   }, [googleClientId]);

// //   return { googleLogin };
// // };

// // export default useGoogleAuth;
