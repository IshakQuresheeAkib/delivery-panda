# Real-Time Chat Feature - Setup & Usage Guide

## 📋 Overview
This implementation provides a real-time chat feature between Delivery Riders and Customers using Socket.io. The architecture is designed for easy swapping from mock to production environments.

---

## 🚀 Quick Start

### 1. Start the Mock Server
In a **new terminal**, run:
```bash
node server.js
```

You should see:
```
✅ Mock Socket.io server running on http://localhost:3000
   Use this URL in your app: http://localhost:3000
   Health check: http://localhost:3000/health
```

**Important for Mobile Testing:**
- If testing on a physical device or emulator, you'll need to use your computer's local IP address instead of `localhost`
- Update `constants/chatConfig.ts` → `SOCKET_URL` to your local IP:
  ```typescript
  SOCKET_URL: 'http://192.168.1.100:3000', // Replace with your IP
  ```
- Find your IP:
  - **Windows**: `ipconfig` (look for IPv4 Address)
  - **Mac/Linux**: `ifconfig` or `ip addr`

### 2. Start the Expo App
In your **main terminal**:
```bash
npm run start
```

Then press `i` for iOS, `a` for Android, or `w` for web.

### 3. Navigate to Chat
- Login as a rider
- Navigate to the Messages screen (bottom tab bar)
- You should see a real-time chat interface

---

## 📁 Project Structure

```
delivery-panda/
├── server.js                         # Mock Socket.io server (PHASE 1)
│
├── constants/
│   ├── chatConfig.ts                 # Socket configuration (PHASE 2)
│   └── chatTypes.ts                  # TypeScript interfaces (PHASE 2)
│
├── store/
│   └── chatStore.ts                  # Zustand chat state (PHASE 2)
│
├── components/
│   └── chat/
│       ├── MessageBubble.tsx         # Message display (PHASE 3)
│       └── ChatInput.tsx             # Input component (PHASE 3)
│
└── app/(rider)/
    └── message.tsx                   # Chat screen (PHASE 4)
```

---

## 🔧 Phase Breakdown

### Phase 1: Mock Server (`server.js`)
**Purpose**: Simulates customer chat responses for development

**Features**:
- Listens on port 3000
- Provides dummy customer data on connection
- Echoes rider messages back
- Simulates customer replies after 2 seconds
- Random responses from a pool of 7 mock messages

**Test it**:
```bash
# Health check
curl http://localhost:3000/health
```

---

### Phase 2: Configuration & State

#### `constants/chatConfig.ts`
**Purpose**: Centralized Socket.io configuration

**Key Settings**:
```typescript
SOCKET_URL: 'http://localhost:3000' // ⚠️ CHANGE TO PRODUCTION URL HERE
CONNECTION_OPTIONS: {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  timeout: 10000,
}
```

**Event Names**:
- `join_chat` - Join a chat room for an order
- `send_message` - Send message from rider
- `receive_message` - Receive message from customer
- `customer_info` - Get customer details

#### `constants/chatTypes.ts`
**Purpose**: TypeScript interfaces for type safety

**Main Types**:
- `Message` - Chat message structure
- `MessageSender` - 'rider' | 'customer'
- `CustomerInfo` - Customer details
- Payload types for socket events

#### `store/chatStore.ts`
**Purpose**: Manages Socket.io connection and chat state

**State**:
```typescript
{
  socket: Socket | null,          // Socket.io instance
  isConnected: boolean,           // Connection status
  customerInfo: CustomerInfo | null,
  messages: Message[],            // Chat history
  currentOrderId: string | null,
}
```

**Actions**:
- `connect(orderId)` - Establish socket connection
- `disconnect()` - Close connection & cleanup
- `sendMessage(text)` - Send a message
- `clearMessages()` - Reset chat history

---

### Phase 3: UI Components

#### `MessageBubble.tsx`
**Purpose**: Display individual messages

**Features**:
- Different styles for rider vs customer
- Timestamp formatting
- Status indicators (sending, sent, delivered, failed)
- Avatar placeholders
- Responsive bubble sizing

**Usage**:
```tsx
<MessageBubble message={message} />
```

#### `ChatInput.tsx`
**Purpose**: Message input interface

**Features**:
- Multiline text input (max 500 chars)
- Auto-resizing (up to 100px height)
- Character limit warning
- Send button with state
- Disabled state when not connected
- Return key sends message

**Usage**:
```tsx
<ChatInput 
  onSend={(text) => sendMessage(text)}
  disabled={!isConnected}
/>
```

---

### Phase 4: Chat Screen (`app/(rider)/message.tsx`)

**Features**:
- Auto-connect on mount with `DEMO_ORDER_ID`
- Auto-disconnect on unmount (cleanup)
- FlatList for message rendering
- Auto-scroll to bottom on new messages
- Customer info header
- Connection status indicator
- Error handling UI
- KeyboardAvoidingView for iOS/Android
- Empty state when no messages

**Order ID**:
Currently uses `ORDER_001` for demo. In production:
```typescript
// Get from route params
const { orderId } = useLocalSearchParams();

// Or from active order state
const orderId = useOrderStore(state => state.activeOrder?.id);
```

---

## 🔄 Switching to Production

### Step 1: Update Socket URL
**File**: `constants/chatConfig.ts`

```typescript
export const CHAT_CONFIG = {
  // Replace with your production URL
  SOCKET_URL: 'https://api.yourdomain.com',
  // ... rest stays the same
}
```

### Step 2: Update Event Names (if different)
Check your production Socket.io server's event names and update:
```typescript
EVENTS: {
  JOIN_CHAT: 'join_chat',        // Update if different
  SEND_MESSAGE: 'send_message',  // Update if different
  // ...
}
```

### Step 3: Handle Authentication
Add authentication token to socket connection:

```typescript
// In chatStore.ts, connect function:
const authToken = useAuthStore.getState().token;

const newSocket = io(socketUrl, {
  ...CHAT_CONFIG.CONNECTION_OPTIONS,
  auth: {
    token: authToken,
  },
});
```

### Step 4: Remove Mock Server
Once production is working:
```bash
# Delete or archive
rm server.js
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Server starts without errors
- [ ] App connects to server on screen mount
- [ ] Can send messages
- [ ] Receives customer replies (mock: 2 sec delay)
- [ ] Messages show correct sender styling
- [ ] Timestamps display correctly
- [ ] Status icons update (sending → delivered)
- [ ] Auto-scroll works on new messages
- [ ] Keyboard doesn't cover input
- [ ] Disconnects properly on screen unmount
- [ ] Connection error shows when server is down

### Test Connection Error
1. Stop the server (Ctrl+C in server terminal)
2. Navigate to chat screen
3. Should show: "Unable to connect to chat server"

### Test Multiple Orders
Update `DEMO_ORDER_ID` to `ORDER_002`:
- Should connect to different customer (Michael Chen)
- Different delivery address

---

## 🎨 Customization

### Change Message Colors
**File**: `components/chat/MessageBubble.tsx`

```tsx
// Rider messages (currently yellow)
className="bg-primary rounded-tr-sm"

// Customer messages (currently white with border)
className="bg-card-bg border border-border-soft rounded-tl-sm"
```

### Add Typing Indicators
The infrastructure is already in place:

**In chatStore.ts**:
```typescript
socket.emit(CHAT_CONFIG.EVENTS.TYPING_START, { orderId });
```

**Listen for customer typing**:
```typescript
socket.on('customer_typing', (data) => {
  set({ isCustomerTyping: true });
});
```

### Add Read Receipts
Similar pattern to message status updates.

---

## 🐛 Troubleshooting

### "Cannot connect to chat server"
- **Cause**: Server not running or wrong URL
- **Fix**: Ensure `node server.js` is running

### Messages not appearing
- **Cause**: Socket not connected
- **Fix**: Check console logs for connection errors

### Keyboard covers input (iOS)
- **Cause**: KeyboardAvoidingView offset wrong
- **Fix**: Adjust `keyboardVerticalOffset` in message.tsx

### "localhost" doesn't work on device
- **Cause**: Device can't access localhost
- **Fix**: Use your computer's local IP address

### TypeScript errors
```bash
npx tsc --noEmit
```

---

## 📱 Platform-Specific Notes

### iOS
- Uses `behavior="padding"` for KeyboardAvoidingView
- Offset: 90px

### Android
- Uses `behavior="height"` for KeyboardAvoidingView
- Offset: 0px

### Web
- Socket.io works normally
- Keyboard behavior handled by browser

---

## 🔐 Security Considerations

### Before Production:
1. **Authentication**: Add token-based auth to socket connection
2. **Message Validation**: Validate message content server-side
3. **Rate Limiting**: Prevent spam/abuse
4. **Encryption**: Use WSS (WebSocket Secure)
5. **Input Sanitization**: Prevent XSS attacks

---

## 📊 Performance Tips

### Optimize Message List
Already using FlatList (renders only visible items)

### Reduce Re-renders
Store actions are memoized by Zustand

### Limit Message History
```typescript
// In chatStore, when receiving messages:
set((state) => ({
  messages: [...state.messages, newMessage].slice(-100) // Keep last 100
}));
```

---

## 🚧 Future Enhancements

- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message reactions
- [ ] File/image sharing
- [ ] Voice messages
- [ ] Message search
- [ ] Push notifications for new messages
- [ ] Offline message queue
- [ ] Message pagination (load older messages)

---

## 📚 Dependencies Added

```json
{
  "socket.io-client": "^4.x.x",
  "express": "^4.x.x",
  "socket.io": "^4.x.x",
  "@types/express": "^4.x.x"
}
```

---

## 💡 Key Architecture Decisions

1. **Socket in Zustand (not React state)**: Prevents reconnection on re-renders
2. **Optimistic UI updates**: Messages appear immediately, update on confirmation
3. **Auto-cleanup**: Disconnect on unmount prevents memory leaks
4. **Centralized config**: Easy environment switching
5. **TypeScript strict mode**: Catch errors at compile time

---

## 🎯 Production Checklist

- [ ] Update `SOCKET_URL` to production endpoint
- [ ] Add authentication to socket connection
- [ ] Update event names to match production
- [ ] Remove or disable mock server
- [ ] Test with real backend
- [ ] Add error tracking (Sentry, etc.)
- [ ] Add analytics events
- [ ] Implement message persistence
- [ ] Handle offline scenarios
- [ ] Add rate limiting

---

## 📞 Support

If you encounter issues:
1. Check server logs (`node server.js` terminal)
2. Check app console logs (React Native debugger)
3. Verify socket connection: `isConnected` should be `true`
4. Test health endpoint: `http://localhost:3000/health`

---

**Happy Chatting! 💬🚀**
