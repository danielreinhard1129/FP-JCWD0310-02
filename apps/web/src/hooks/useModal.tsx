'use client';
import { Modal } from 'antd';
import React, { useState } from 'react';

export const useModal = (title?: string) => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalTitle, setTitle] = useState<string>(title || 'Confirm');
  const ModalAsync = ({
    loading,
    handleOk,
    description,
  }: {
    loading: boolean;
    handleOk: () => void;
    description: string;
  }) => {
    const handleConfirm = () => {
      setOpen(false);
      handleOk();
    };
    return (
      <Modal
        title={modalTitle}
        open={open}
        // children={Description}
        onOk={handleConfirm}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
      >
        <div className="w-full font-bold">{description}</div>
      </Modal>
    );
  };
  return { setOpen, setTitle, ModalAsync };
};

export default useModal;
