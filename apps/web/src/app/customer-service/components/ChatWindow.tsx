"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Avatar, ActionIcon, Menu, Textarea, Tooltip, Indicator } from '@mantine/core';
import { 
  IconDotsVertical, 
  IconPaperclip, 
  IconSend, 
  IconCheck, 
  IconChecks,
  IconArrowLeft,
} from '@tabler/icons-react';
import { Conversation, currentUser } from '../data/mockChatData';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export default function ChatWindow({ conversation, onSendMessage, onBack, isMobile }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState('');
  const scrollViewport = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive or conversation changes
  useEffect(() => {
    if (scrollViewport.current) {
      scrollViewport.current.scrollTop = scrollViewport.current.scrollHeight;
    }
  }, [conversation?.messages, conversation?.id]);

  const handleSend = () => {
    if (messageInput.trim() && conversation) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

  if (!conversation) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-slate-50 text-slate-400">
        <div className="w-24 h-24 mb-4 rounded-full bg-slate-200 flex items-center justify-center">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-lg font-medium">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center">
          {isMobile && (
            <ActionIcon variant="subtle" color="gray" onClick={onBack} mr="sm">
              <IconArrowLeft size={20} />
            </ActionIcon>
          )}
          
          <Indicator
            inline
            size={12}
            offset={5}
            position="bottom-end"
            color={getStatusColor(conversation.user.status)}
            withBorder
          >
            <Avatar src={conversation.user.avatar} radius="xl" size="md" color="blue">
              {conversation.user.name.charAt(0)}
            </Avatar>
          </Indicator>
          
          <div className="ml-3">
            <h2 className="text-base font-semibold text-slate-800 leading-tight">{conversation.user.name}</h2>
            <span className="text-xs text-slate-500 capitalize">{conversation.user.status}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" radius="xl">
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>View Profile</Menu.Item>
              <Menu.Item>Resolve Concern</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {/* Message History */}
      <div 
        ref={scrollViewport}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
      >
        <div className="text-center text-xs text-slate-400 my-4">
          Conversation started
        </div>

        {conversation.messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser.id;
          const showAvatar = !isMe && (index === 0 || conversation.messages[index - 1].senderId !== msg.senderId);
          
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
              {!isMe && (
                <div className="w-8 flex-shrink-0 mr-2">
                  {showAvatar ? (
                    <Avatar src={conversation.user.avatar} radius="xl" size="sm" color="blue" className="mt-auto">
                      {conversation.user.name.charAt(0)}
                    </Avatar>
                  ) : null}
                </div>
              )}
              
              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div 
                  className={`
                    px-4 py-2 rounded-2xl relative
                    ${isMe 
                      ? 'bg-[#18388c] text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                    }
                  `}
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                </div>
                
                <div className={`flex items-center mt-1 space-x-1 text-[11px] text-slate-400 ${isMe ? 'mr-1' : 'ml-1'}`}>
                  <span>{formatTime(msg.timestamp)}</span>
                  {isMe && (
                    <span className="ml-1 text-blue-500">
                      {msg.isRead ? <IconChecks size={14} /> : <IconCheck size={14} />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
          <ActionIcon variant="subtle" color="gray" size="lg" radius="xl" className="mb-1">
            <IconPaperclip size={20} />
          </ActionIcon>
          
          <Textarea
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            autosize
            minRows={1}
            maxRows={4}
            variant="unstyled"
            className="flex-1 pb-1"
            styles={{
              input: {
                fontSize: '0.875rem',
                padding: '4px 0',
                '&::placeholder': { color: '#94a3b8' }
              }
            }}
          />
          
          <ActionIcon 
            variant="filled" 
            color="blue" 
            size="lg" 
            radius="xl" 
            className="mb-1"
            onClick={handleSend}
            disabled={!messageInput.trim()}
          >
            <IconSend size={18} className={messageInput.trim() ? "ml-1" : ""} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}
