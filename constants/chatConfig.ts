/**
 * Chat Configuration
 * Centralized configuration for Socket.io chat feature.
 * Change SOCKET_URL to your production URL when ready.
 */
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ⚠️ CHANGE THIS TO YOUR PRODUCTION URL WHEN READY
// For development with Expo, use your local IP address instead of localhost
// Example: 'http://192.168.1.100:3000' or your production URL
export const CHAT_CONFIG = {
  // Production URL (set when backend is available)
  PRODUCTION_SOCKET_URL: '',
  // Default local dev fallback for web/simulator
  LOCAL_SOCKET_URL: 'http://localhost:3000',
  
  // Socket.io connection options
  CONNECTION_OPTIONS: {
    transports: ['websocket', 'polling'] as ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 10000,
  },
  
  // Event names for Socket.io communication
  EVENTS: {
    // Connection events
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    CONNECT_ERROR: 'connect_error',
    
    // Chat events
    JOIN_CHAT: 'join_chat',
    SEND_MESSAGE: 'send_message',
    RECEIVE_MESSAGE: 'receive_message',
    MESSAGE_SENT: 'message_sent',
    CUSTOMER_INFO: 'customer_info',
    
    // Typing indicators (optional)
    TYPING_START: 'typing_start',
    TYPING_STOP: 'typing_stop',
  },
} as const;

/**
 * Get the appropriate socket URL based on platform
 * For mobile testing, you'll need to use your computer's local IP
 * instead of localhost
 */
export const getSocketUrl = (): string => {
  if (CHAT_CONFIG.PRODUCTION_SOCKET_URL) {
    return CHAT_CONFIG.PRODUCTION_SOCKET_URL;
  }

  // Web can use localhost directly.
  if (Platform.OS === 'web') {
    return CHAT_CONFIG.LOCAL_SOCKET_URL;
  }

  // For native dev builds, derive host from Expo debugger host when available.
  const debuggerHost =
    Constants.expoConfig?.hostUri ?? Constants.manifest2?.extra?.expoClient?.hostUri;
  const host = debuggerHost?.split(':')[0];

  if (host) {
    return `http://${host}:3000`;
  }

  // Last fallback (works on simulators, not physical devices).
  return CHAT_CONFIG.LOCAL_SOCKET_URL;
};
