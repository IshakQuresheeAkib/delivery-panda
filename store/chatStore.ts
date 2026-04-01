/**
 * Chat Store using Zustand
 * Manages Socket.io connection, messages, and real-time communication
 */

import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { CHAT_CONFIG, getSocketUrl } from '@/constants/chatConfig';
import type {
  Message,
  CustomerInfo,
  SendMessagePayload,
  ReceiveMessagePayload,
  MessageSentPayload,
  JoinChatPayload,
} from '@/constants/chatTypes';

interface ChatState {
  // Socket instance
  socket: Socket | null;
  
  // Connection state
  isConnected: boolean;
  connectionError: string | null;
  
  // Customer info
  customerInfo: CustomerInfo | null;
  
  // Messages
  messages: Message[];
  
  // Current order being chatted about
  currentOrderId: string | null;
  
  // Actions
  connect: (orderId: string) => void;
  disconnect: () => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  socket: null,
  isConnected: false,
  connectionError: null,
  customerInfo: null,
  messages: [],
  currentOrderId: null,

  connect: (orderId: string) => {
    const { socket: existingSocket } = get();

    // If already connected to the same order, do nothing
    if (existingSocket && get().isConnected && get().currentOrderId === orderId) {
      console.log('[ChatStore] Already connected to this order');
      return;
    }

    // Disconnect existing socket if any
    if (existingSocket) {
      existingSocket.disconnect();
    }

    // Create new socket connection
    const socketUrl = getSocketUrl();
    console.log('[ChatStore] Connecting to:', socketUrl);
    
    const newSocket = io(socketUrl, CHAT_CONFIG.CONNECTION_OPTIONS);

    // Connection event handlers
    newSocket.on(CHAT_CONFIG.EVENTS.CONNECT, () => {
      console.log('[ChatStore] Connected to socket server');
      set({ 
        isConnected: true, 
        connectionError: null,
        currentOrderId: orderId,
      });

      // Join the chat room for this order
      const joinPayload: JoinChatPayload = { orderId };
      newSocket.emit(CHAT_CONFIG.EVENTS.JOIN_CHAT, joinPayload);
    });

    newSocket.on(CHAT_CONFIG.EVENTS.DISCONNECT, () => {
      console.log('[ChatStore] Disconnected from socket server');
      set({ isConnected: false });
    });

    newSocket.on(CHAT_CONFIG.EVENTS.CONNECT_ERROR, (error) => {
      console.error('[ChatStore] Connection error:', error);
      set({ 
        connectionError: error.message || 'Failed to connect to chat server',
        isConnected: false,
      });
    });

    // Customer info event
    newSocket.on(CHAT_CONFIG.EVENTS.CUSTOMER_INFO, (data: CustomerInfo) => {
      console.log('[ChatStore] Received customer info:', data);
      set({ customerInfo: data });
    });

    // Message events
    newSocket.on(CHAT_CONFIG.EVENTS.RECEIVE_MESSAGE, (data: ReceiveMessagePayload) => {
      console.log('[ChatStore] Received message:', data);
      
      set((state) => {
        // Check if message already exists to prevent duplicates
        const exists = state.messages.some(msg => msg.id === data.id);
        if (exists) {
          return state; // Ignore it, the rider already optimistically added it
        }

        const newMessage: Message = {
          id: data.id,
          text: data.text,
          sender: data.sender,
          timestamp: data.timestamp,
          orderId: data.orderId,
          status: 'delivered',
        };

        return { messages: [...state.messages, newMessage] };
      });
    });

    newSocket.on(CHAT_CONFIG.EVENTS.MESSAGE_SENT, (data: MessageSentPayload) => {
      console.log('[ChatStore] Message sent confirmation:', data);
      
      // Update the status of the sent message
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === data.id
            ? { ...msg, status: data.status }
            : msg
        ),
      }));
    });

    // Store the socket instance
    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();
    
    if (socket) {
      console.log('[ChatStore] Disconnecting socket');
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
        connectionError: null,
        // Don't wipe messages or customer info here, let them persist
      });
    }
  },

  sendMessage: (text: string) => {
    const { socket, isConnected, currentOrderId } = get();

    if (!socket || !isConnected) {
      console.error('[ChatStore] Cannot send message: not connected');
      set({ connectionError: 'Not connected to chat server' });
      return;
    }

      // Keep the message but mark as failed
      if (currentOrderId && text.trim()) {
        const messageId = `msg_${Date.now()}_rider`;
        const timestamp = new Date().toISOString();
        
        set((state) => ({
          messages: [...state.messages, {
            id: messageId,
            text: text.trim(),
            sender: 'rider',
            timestamp,
            orderId: currentOrderId,
            status: 'failed',
          }],
        }));
      }
      
    if (!currentOrderId) {
      console.error('[ChatStore] Cannot send message: no order ID');
      return;
    }

    if (!text.trim()) {
      console.warn('[ChatStore] Cannot send empty message');
      return;
    }

    // Create message object
    const messageId = `msg_${Date.now()}_rider`;
    const timestamp = new Date().toISOString();

    const message: Message = {
      id: messageId,
      text: text.trim(),
      sender: 'rider',
      timestamp,
      orderId: currentOrderId,
      status: 'sending',
    };

    // Optimistically add to messages array
    set((state) => ({
      messages: [...state.messages, message],
    }));

    // Send to server
    const payload: SendMessagePayload = {
      id: messageId,
      text: text.trim(),
      sender: 'rider',
      timestamp,
      orderId: currentOrderId,
    };

    socket.emit(CHAT_CONFIG.EVENTS.SEND_MESSAGE, payload);
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));
