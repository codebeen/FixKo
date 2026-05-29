import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import { useUserRole } from '../hooks/useUserRole';
const messagesData = require('../../../data/Message.json');

interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

export default function MessageView() {
  const role = useUserRole();
  const roleData = (messagesData as any)[role] || {};
  const [selectedInboxUser, setSelectedInboxUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(roleData.initialMessages || []);
  const [newMessageText, setNewMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Inbox contacts based on role from JSON
  const contacts = roleData.contacts || [];
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter((c: any) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;

    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'me',
      text: newMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setNewMessageText('');

    // Simulate reply after 1.5 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'other',
        text: 'Received! Let me know if you need anything else.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const renderInboxItem = ({ item }: { item: typeof contacts[0] }) => (
    <TouchableOpacity
      onPress={() => setSelectedInboxUser(item.name)}
      className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl p-4 mb-3"
    >
      <View className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/30 justify-center items-center mr-3">
        <Text className="text-[#7EB1F1] font-bold text-lg">{item.avatarLetter}</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-base font-bold">{item.name}</Text>
          <Text className="text-[#AAB8C2] text-xs">{item.time}</Text>
        </View>
        <Text className="text-brand-yellow text-xs mt-0.5">{item.service}</Text>
        <Text className="text-brand-grey-light text-xs mt-1" numberOfLines={1}>
          {item.lastMsg}
        </Text>
      </View>

      {item.unread > 0 && (
        <View className="bg-brand-blue w-5 h-5 rounded-full justify-center items-center ml-2">
          <Text className="text-[#001449] font-bold text-[10px]">{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <BaseMain>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-5 pt-4">

          {selectedInboxUser ? (
            /* Chat Screen */
            <View className="flex-1">
              {/* Header */}
              <View className="flex-row items-center border-b border-white/10 pb-4 mb-4">
                <TouchableOpacity
                  onPress={() => setSelectedInboxUser(null)}
                  className="mr-3 p-1"
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold">{selectedInboxUser}</Text>
                  <Text className="text-[#4ade80] text-xs font-semibold">Active Booking</Text>
                </View>
                <TouchableOpacity className="p-2">
                  <Ionicons name="call" size={20} color="#7EB1F1" />
                </TouchableOpacity>
              </View>

              {/* Message List */}
              <ScrollView
                ref={ref => ref?.scrollToEnd({ animated: true })}
                className="flex-1 mb-4"
                showsVerticalScrollIndicator={false}
              >
                {chatMessages.map(msg => (
                  <View
                    key={msg.id}
                    className={`max-w-[80%] rounded-2xl p-3.5 mb-3 ${msg.sender === 'me'
                      ? 'bg-brand-blue self-end rounded-tr-none'
                      : 'bg-white/10 self-start rounded-tl-none border border-white/5'
                      }`}
                  >
                    <Text className={`text-sm ${msg.sender === 'me' ? 'text-[#001449] font-medium' : 'text-white'}`}>
                      {msg.text}
                    </Text>
                    <Text className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-[#001449]/70' : 'text-brand-grey-light'}`}>
                      {msg.timestamp}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Chat Input Bar */}
              <View className="flex-row items-center bg-white/5 border border-white/10 rounded-full p-2 mb-6">
                <TouchableOpacity className="p-2">
                  <Ionicons name="add-circle-outline" size={22} color="#AAB8C2" />
                </TouchableOpacity>
                <TextInput
                  placeholder="Type a message..."
                  placeholderTextColor="#888"
                  value={newMessageText}
                  onChangeText={setNewMessageText}
                  className="flex-1 text-white text-sm px-2 py-2 outline-none"
                  onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity className="p-2 mr-1">
                  <Ionicons name="camera-outline" size={20} color="#AAB8C2" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSendMessage}
                  className="w-10 h-10 bg-brand-blue rounded-full justify-center items-center"
                >
                  <Ionicons name="send" size={16} color="#001449" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Inbox List Screen */
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-2xl font-bold">Messages</Text>
                <View className="bg-brand-blue/15 px-3 py-1 rounded-full border border-brand-blue/20">
                  <Text className="text-[#7EB1F1] text-[10px] font-bold uppercase tracking-wider">
                    {role} Mode
                  </Text>
                </View>
              </View>

              {/* Search Bar */}
              <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3 mb-4">
                <Ionicons name="search" size={18} color="#AAB8C2" />
                <TextInput
                  placeholder="Search messages..."
                  placeholderTextColor="#AAB8C2"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 text-white text-sm ml-2 outline-none"
                />
              </View>

              <FlatList
                data={filteredContacts}
                renderItem={renderInboxItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                  <View className="flex-1 justify-center items-center py-20">
                    <Ionicons name="chatbubbles-outline" size={48} color="#666" />
                    <Text className="text-brand-grey-light text-base mt-4">No conversations yet</Text>
                  </View>
                }
              />
            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </BaseMain>
  );
}
