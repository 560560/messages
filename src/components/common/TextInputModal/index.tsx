import React from 'react';
import { Button, Modal, Input } from 'antd';

const { TextArea } = Input;

interface ConfirmationModalProps {
  confirmButtonTitle: string;
  closeModal: () => void;
  isSubmitting: boolean;
  maxLength?: number;
  onConfirm: React.MouseEventHandler<HTMLElement>;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textValue: string;
  title: string;
  visible: boolean;
}

export const TextInputModal = React.memo<ConfirmationModalProps>(
  ({
    confirmButtonTitle,
    closeModal,
    isSubmitting,
    maxLength = 200,
    onConfirm,
    onTextChange,
    textValue,
    title,
    visible,
  }) => (
    <Modal
      visible={visible}
      onCancel={closeModal}
      title={title}
      destroyOnClose={false}
      centered
      footer={[
        <Button key="back" onClick={closeModal} danger>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={onConfirm}
          disabled={!textValue.length}
        >
          {confirmButtonTitle}
        </Button>,
      ]}
    >
      <TextArea
        rows={5}
        maxLength={maxLength}
        value={textValue}
        onChange={onTextChange}
        showCount
      />
    </Modal>
  )
);
