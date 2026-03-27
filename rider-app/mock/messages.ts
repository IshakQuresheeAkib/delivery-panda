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
];

export const mockNoticeCount = 9;
