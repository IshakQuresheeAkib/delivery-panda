/**
 * TypeScript interfaces and types for the chat feature
 */

export type MessageSender = 'rider' | 'customer';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string; // ISO 8601 format
  orderId: string;
  status?: MessageStatus;
}

export interface CustomerInfo {
  customerId: string;
  customerName: string;
  customerAvatar: string | null;
  orderId: string;
  deliveryAddress: string;
}

export interface SendMessagePayload {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  orderId: string;
}

export interface ReceiveMessagePayload {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  orderId: string;
}

export interface MessageSentPayload {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  orderId: string;
  status: MessageStatus;
}

export interface JoinChatPayload {
  orderId: string;
  riderId?: string;
}

export interface TypingPayload {
  orderId: string;
  sender: MessageSender;
}
