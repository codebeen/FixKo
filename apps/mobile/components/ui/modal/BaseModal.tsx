import React, { useEffect } from 'react';
import { Modal, View, ViewStyle } from 'react-native';

interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  overlayStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  overlayClassName?: string;
  cardClassName?: string;
  /** Auto-dismiss after this many milliseconds when visible */
  autoDismiss?: number;
}

export default function BaseModal({
  visible,
  onClose,
  children,
  overlayStyle,
  cardStyle,
  overlayClassName = '',
  cardClassName = '',
  autoDismiss,
}: BaseModalProps) {
  useEffect(() => {
    if (!visible || !autoDismiss || !onClose) return;
    const timer = setTimeout(onClose, autoDismiss);
    return () => clearTimeout(timer);
  }, [visible, autoDismiss, onClose]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={overlayStyle}
        className={`flex-1 bg-black/72 justify-center items-center px-6 ${overlayClassName}`}
      >
        <View
          style={cardStyle}
          className={`w-full max-w-[360px] bg-brand-navy-dark rounded-[20px] border border-white/10 px-[22px] py-6 shadow-2xl ${cardClassName}`}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

