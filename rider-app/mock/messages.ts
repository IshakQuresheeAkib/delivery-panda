export interface Message {
  id: string;
  senderName?: string;
  senderAvatar?: string;
  preview: string;
  timestamp: string;
  isAnonymous: boolean;
}

export const mockMessages: Message[] = [
  {
    id: '1',
    preview: 'Because the food is delivered to you, it is not leave at door',
    timestamp: '20:57',
    isAnonymous: true,
  },
  {
    id: '2',
    senderName: 'Ran',
    senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    preview: 'Hello, your meal has been delivered to you, I wish you a h...',
    timestamp: '20:48',
    isAnonymous: false,
  },
  {
    id: '3',
    preview: 'Hello, your meal has been delivered to you, I wish you a h...',
    timestamp: '20:45',
    isAnonymous: true,
  },
  {
    id: '4',
    preview: 'Hello, your meal has been delivered to you, I wish you a h...',
    timestamp: '20:13',
    isAnonymous: true,
  },
  {
    id: '5',
    preview: 'Hello, your meal has been delivered to you, I wish you a h...',
    timestamp: '20:11',
    isAnonymous: true,
  },
  {
    id: '6',
    preview: 'Hello, your meal has been delivered to you, I wish you a h...',
    timestamp: '20:05',
    isAnonymous: true,
  },
  {
    id: '7',
    preview: 'Because the food is delivered to you, it is not leave at door',
    timestamp: '19:40',
    isAnonymous: true,
  },
  {
    id: '8',
    senderName: 'Emily Chen',
    senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    preview: 'Thank you for the quick delivery! The food was still hot.',
    timestamp: '19:22',
    isAnonymous: false,
  },
  {
    id: '9',
    senderName: 'James Wilson',
    preview: 'Can you please call me when you arrive at the building?',
    timestamp: '18:55',
    isAnonymous: false,
  },
  {
    id: '10',
    preview: 'Order received, on my way to pickup location now.',
    timestamp: '18:30',
    isAnonymous: true,
  },
];

export const mockNoticeCount = 9;
