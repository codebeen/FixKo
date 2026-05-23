"use client";

import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { mockConversations, currentUser } from '../data/mockChatData';

export default function ChatLayout() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Responsive handling
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const activeConversation = conversations.find(c => c.id === activeId) || null;

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    
    // Mark as read when selected
    setConversations(prev => prev.map(conv => {
      if (conv.id === id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(m => ({ ...m, isRead: true }))
        };
      }
      return conv;
    }));
  };

  const handleSendMessage = (content: string) => {
    if (!activeId) return;
    
    const newMessage = {
      id: `m-new-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const handleBack = () => {
    setActiveId(null);
  };

  // On mobile, show either sidebar OR chat window. On desktop, show both.
  const showSidebar = !isMobile || (isMobile && !activeId);
  const showChat = !isMobile || (isMobile && activeId);

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Sidebar Section */}
      {showSidebar && (
        <div className={`${isMobile ? 'w-full' : 'w-80 lg:w-96'} flex-shrink-0`}>
          <ChatSidebar 
            conversations={conversations} 
            activeConversationId={activeId}
            onSelectConversation={handleSelectConversation}
          />
        </div>
      )}

      {/* Chat Window Section */}
      {showChat && (
        <div className="flex-1 min-w-0 h-full">
          <ChatWindow 
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
}
