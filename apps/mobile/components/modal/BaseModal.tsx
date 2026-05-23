import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  overlayStyle?: ViewStyle;
  cardStyle?: ViewStyle;
}

export default function BaseModal({
  visible,
  onClose,
  children,
  overlayStyle,
  cardStyle,
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, overlayStyle]}>
        <View style={[styles.card, cardStyle]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#07183B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.25)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 14,
  },
  bodyText: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 19,
    marginBottom: 12,
  },
  list: {
    gap: 8,
    marginBottom: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listText: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
    lineHeight: 18,
  },
  noteText: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 17,
    fontStyle: 'italic',
  },
  highlight: {
    color: '#FACC15',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FACC15',
    borderRadius: 50,
    height: 48,
    marginTop: 4,
  },
  acceptBtnText: {
    color: '#001449',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#07183B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
});
