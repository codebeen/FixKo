import React, { useState, useRef } from 'react';
import {
  Text, View, TouchableOpacity, TextInput,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'other', text: 'Hello! Just confirming our booking for today.', timestamp: '09:55 AM' },
  { id: '2', sender: 'me',    text: 'Hi! Yes, I am already on my way to your location.', timestamp: '09:57 AM' },
  { id: '3', sender: 'other', text: 'Great! The gate code is 4521. See you soon!', timestamp: '09:58 AM' },
];

export default function ChatView() {
  const { client, title } = useLocalSearchParams<{ client: string; title: string }>();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText]   = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const avatarLetter = (client || 'C').charAt(0).toUpperCase();

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const sent: ChatMessage = { id: Math.random().toString(), sender: 'me', text: trimmed, timestamp: formatTime() };
    setMessages(prev => [...prev, sent]);
    setInputText('');

    // Simulated auto-reply after 1.5s
    setTimeout(() => {
      const reply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'other',
        text: 'Got it! Thanks for the update.',
        timestamp: formatTime(),
      };
      setMessages(prev => [...prev, reply]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1500);

    scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <BaseMain theme="navy" scrollable={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, padding: 4 }}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          {/* Avatar */}
          <View
            style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: 'rgba(102,238,102,0.15)',
              borderWidth: 1.5, borderColor: 'rgba(102,238,102,0.3)',
              justifyContent: 'center', alignItems: 'center', marginRight: 10,
            }}
          >
            <Text style={{ color: '#66EE66', fontWeight: '700', fontSize: 16 }}>{avatarLetter}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{client || 'Client'}</Text>
            <Text style={{ color: '#66EE66', fontSize: 11, fontWeight: '600' }}>
              {title ? `📋 ${title}` : 'Active Booking'}
            </Text>
          </View>

          <TouchableOpacity style={{ padding: 6 }}>
            <Ionicons name="call-outline" size={20} color="#7EB1F1" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={{
                maxWidth: '80%',
                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'me' ? '#66EE66' : 'rgba(255,255,255,0.08)',
                borderRadius: 18,
                borderTopRightRadius: msg.sender === 'me' ? 4 : 18,
                borderTopLeftRadius:  msg.sender === 'me' ? 18 : 4,
                padding: 12,
                marginBottom: 10,
                borderWidth: msg.sender === 'other' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <Text style={{ color: msg.sender === 'me' ? '#001540' : 'white', fontSize: 14 }}>
                {msg.text}
              </Text>
              <Text
                style={{
                  fontSize: 9, marginTop: 4, textAlign: 'right',
                  color: msg.sender === 'me' ? 'rgba(0,21,64,0.6)' : 'rgba(255,255,255,0.4)',
                }}
              >
                {msg.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 12, paddingVertical: 10,
            borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <TextInput
            placeholder="Type a message..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10,
              color: 'white', fontSize: 14, marginRight: 8,
            }}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              width: 42, height: 42, borderRadius: 21,
              backgroundColor: '#66EE66',
              justifyContent: 'center', alignItems: 'center',
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={16} color="#001540" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseMain>
  );
}
