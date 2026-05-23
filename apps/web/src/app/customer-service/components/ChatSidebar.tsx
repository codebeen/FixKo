"use client";

import React, { useState } from 'react';
import { Avatar, Badge, Indicator, TextInput, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Conversation } from '../data/mockChatData';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ChatSidebar({ conversations, activeConversationId, onSelectConversation }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'away': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white border-r border-slate-200">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-[#001851] mb-4">Messages</h2>
        <TextInput
          placeholder="Search conversations..."
          leftSection={<IconSearch size={16} className="text-slate-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          radius="md"
          styles={{
            input: {
              backgroundColor: '#f8fafc',
              border: 'none',
              '&:focus': {
                border: '1px solid #18388c'
              }
            }
          }}
        />
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2">
          {filteredConversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isActive = conv.id === activeConversationId;
            
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`
                  flex items-center p-3 mb-1 rounded-xl cursor-pointer transition-colors
                  ${isActive ? 'bg-blue-50' : 'hover:bg-slate-50'}
                `}
              >
                {/* Avatar with Status */}
                <div className="relative mr-4">
                  <Indicator
                    inline
                    size={12}
                    offset={5}
                    position="bottom-end"
                    color={getStatusColor(conv.user.status)}
                    withBorder
                    style={{ zIndex: 1 }}
                  >
                    <Avatar 
                      src={conv.user.avatar} 
                      radius="xl" 
                      size="md"
                      color="blue"
                      className={`${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    >
                      {conv.user.name.charAt(0)}
                    </Avatar>
                  </Indicator>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-[#18388c]' : 'text-slate-800'}`}>
                      {conv.user.name}
                    </h3>
                    {lastMessage && (
                      <span className={`text-xs whitespace-nowrap ml-2 ${conv.unreadCount > 0 ? 'text-[#18388c] font-medium' : 'text-slate-400'}`}>
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate mr-2 ${conv.unreadCount > 0 ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                      {lastMessage ? (lastMessage.senderId === conv.user.id ? '' : 'You: ') + lastMessage.content : 'No messages yet'}
                    </p>
                    {conv.unreadCount > 0 && (
                      <Badge size="sm" color="blue" variant="filled" circle>
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredConversations.length === 0 && (
            <div className="text-center p-6 text-slate-500 text-sm">
              No conversations found.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
