'use client';
import LoadingPage from '@/components/LoadingPage';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/useModal';
import React, { useState } from 'react';

const page = () => {
  return (
    <>
      <div className="bg-background p-8"></div>
      <LoadingPage />
    </>
  );
};

export default page;
