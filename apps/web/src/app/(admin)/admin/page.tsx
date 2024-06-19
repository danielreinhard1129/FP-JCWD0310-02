'use client';
import React, { useState } from 'react';

const page = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  return (
    <div className="bg-background h-[2000px] p-8">
      <p>ini admin</p>
    </div>
  );
};

export default page;
