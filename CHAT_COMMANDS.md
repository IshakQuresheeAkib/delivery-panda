# Real-Time Chat - Quick Commands

## Start Development

### Terminal 1: Mock Server
```bash
node server.js
```

### Terminal 2: Expo App
```bash
npm run start
```
Then press:
- `i` - iOS simulator
- `a` - Android emulator  
- `w` - Web browser

---

## Testing

### TypeScript Check
```bash
npx tsc --noEmit
```

### Health Check
```bash
curl http://localhost:3000/health
```

---

## Mobile Device Setup

### Find Your Local IP
**Windows**:
```bash
ipconfig
```
Look for "IPv4 Address"

**Mac/Linux**:
```bash
ifconfig
# or
ip addr
```

### Update Config
Edit `constants/chatConfig.ts`:
```typescript
SOCKET_URL: 'http://YOUR_LOCAL_IP:3000'
// Example: 'http://192.168.1.100:3000'
```

---

## Production Deployment

### 1. Update Socket URL
`constants/chatConfig.ts`:
```typescript
SOCKET_URL: 'https://api.yourdomain.com'
```

### 2. Add Authentication (if needed)
`store/chatStore.ts` → `connect()`:
```typescript
const newSocket = io(socketUrl, {
  ...CHAT_CONFIG.CONNECTION_OPTIONS,
  auth: { token: yourAuthToken },
});
```

### 3. Update Event Names (if different)
`constants/chatConfig.ts` → `EVENTS`

### 4. Remove Mock Server
```bash
rm server.js
```

---

## File Structure

```
├── server.js                      # Mock server (delete in production)
├── constants/
│   ├── chatConfig.ts             # ⚠️ UPDATE SOCKET_URL HERE
│   └── chatTypes.ts              # Type definitions
├── store/
│   └── chatStore.ts              # Socket & state management
├── components/chat/
│   ├── MessageBubble.tsx         # Message display
│   └── ChatInput.tsx             # Input component
└── app/(rider)/
    └── message.tsx               # Chat screen
```

---

## Common Issues

### Can't connect on mobile device
→ Use local IP instead of localhost

### Messages not appearing  
→ Check server is running: `node server.js`

### TypeScript errors
→ Run: `npx tsc --noEmit`

### Keyboard covers input
→ Adjust `keyboardVerticalOffset` in `message.tsx`

---

## Demo Order IDs

Available in mock server:
- `ORDER_001` → Sarah Johnson
- `ORDER_002` → Michael Chen

Change in `app/(rider)/message.tsx`:
```typescript
const DEMO_ORDER_ID = 'ORDER_002';
```
