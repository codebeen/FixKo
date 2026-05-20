"use client";

import { useState } from 'react';
import { Textarea, Button, Group, Text } from '@mantine/core';
import BaseModal from '../../components/modal/BaseModal';

interface RemarksProps {
  opened: boolean;
  onClose: () => void;
  onConfirm?: (remarks: string) => void;
  applicantName?: string;
}

export default function Remarks({ opened, onClose, onConfirm, applicantName }: RemarksProps) {
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!remarks.trim()) {
      setError('Please provide a reason for rejection.');
      return;
    }
    onConfirm?.(remarks.trim());
    setRemarks('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setRemarks('');
    setError('');
    onClose();
  };

  return (
    <BaseModal
      opened={opened}
      onClose={handleClose}
      title="Reject Applicant"
      footer={
        <>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirm}>
            Confirm Rejection
          </Button>
        </>
      }
    >
      {applicantName && (
        <Text size="sm" mb="md" c="dimmed">
          You are rejecting <strong>{applicantName}</strong>. Please provide a reason below.
        </Text>
      )}
      <Textarea
        label="Remarks / Reason"
        placeholder="Enter reason for rejection..."
        minRows={4}
        value={remarks}
        onChange={(e) => {
          setRemarks(e.target.value);
          if (error) setError('');
        }}
        error={error}
        required
      />
    </BaseModal>
  );
}
