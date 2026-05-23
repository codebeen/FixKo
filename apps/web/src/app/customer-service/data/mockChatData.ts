export type UserStatus = 'online' | 'offline' | 'away';

export interface User {
  id: string;
  name: string;
  avatar: string | null;
  status: UserStatus;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
}

export const currentUser: User = {
  id: 'cs-agent-1',
  name: 'Support Team (You)',
  avatar: null,
  status: 'online',
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    unreadCount: 2,
    user: {
      id: 'user-1',
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?u=user1',
      status: 'online',
    },
    messages: [
      {
        id: 'm1',
        senderId: 'user-1',
        content: 'Hi, I need help with my aircon repair booking.',
        timestamp: '2026-05-23T09:00:00Z',
        isRead: true,
      },
      {
        id: 'm2',
        senderId: 'cs-agent-1',
        content: 'Hello Maria! I can help you with that. What seems to be the issue with the booking?',
        timestamp: '2026-05-23T09:05:00Z',
        isRead: true,
      },
      {
        id: 'm3',
        senderId: 'user-1',
        content: 'The technician hasn\'t arrived yet, and it was scheduled for 8 AM.',
        timestamp: '2026-05-23T09:10:00Z',
        isRead: false,
      },
      {
        id: 'm4',
        senderId: 'user-1',
        content: 'Could you please check their ETA?',
        timestamp: '2026-05-23T09:11:00Z',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    unreadCount: 0,
    user: {
      id: 'user-2',
      name: 'Juan Dela Cruz',
      avatar: 'https://i.pravatar.cc/150?u=user2',
      status: 'offline',
    },
    messages: [
      {
        id: 'm5',
        senderId: 'user-2',
        content: 'Is plumbing service available today in Quezon City?',
        timestamp: '2026-05-22T14:30:00Z',
        isRead: true,
      },
      {
        id: 'm6',
        senderId: 'cs-agent-1',
        content: 'Yes, we have available plumbers in QC today. You can book directly through the app!',
        timestamp: '2026-05-22T14:35:00Z',
        isRead: true,
      },
      {
        id: 'm7',
        senderId: 'user-2',
        content: 'Great, I just booked. Thanks!',
        timestamp: '2026-05-22T14:40:00Z',
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    unreadCount: 1,
    user: {
      id: 'user-3',
      name: 'Elena Reyes',
      avatar: null, // Test fallback avatar
      status: 'away',
    },
    messages: [
      {
        id: 'm8',
        senderId: 'user-3',
        content: 'I was overcharged for the electrical repair last week. I have the receipt.',
        timestamp: '2026-05-23T08:15:00Z',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-4',
    unreadCount: 0,
    user: {
      id: 'user-4',
      name: 'Mark Bautista',
      avatar: 'https://i.pravatar.cc/150?u=user4',
      status: 'offline',
    },
    messages: [
      {
        id: 'm9',
        senderId: 'user-4',
        content: 'How do I apply to be a worker on FixKo?',
        timestamp: '2026-05-21T10:00:00Z',
        isRead: true,
      },
      {
        id: 'm10',
        senderId: 'cs-agent-1',
        content: 'Hi Mark! You can apply through our worker portal link. Let me send it to you.',
        timestamp: '2026-05-21T10:15:00Z',
        isRead: true,
      },
    ],
  },
];
