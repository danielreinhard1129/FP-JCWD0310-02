'use client';
import { Info, X } from 'lucide-react';
import React from 'react';
import { Label } from './ui/label';

export const NotificationMessages = ({ messages }: { messages: string }) => {
  return <Label className="text-card-foreground">{messages}</Label>;
};

export const NotificationDescription = ({ messages }: { messages: string }) => {
  return <Label className="text-sm">{messages}</Label>;
};

export const NotificationCloseIcon = () => {
  return <X className="w-8 text-card-foreground" />;
};

export const NotificationOpenIcon = () => {
  return <Info className="w-8 text-card-foreground" />;
};
