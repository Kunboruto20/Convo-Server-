# WhatsApp Web JS Library

A full-featured, real WhatsApp Web client library for Node.js, written in pure JavaScript (no TypeScript), inspired by [Baileys](https://github.com/WhiskeySockets/Baileys). This library is designed to be robust, extensible, and production-ready, supporting all major WhatsApp features: pairing, session management, real message/media sending and receiving, groups, status, profile picture, contacts, broadcast, reactions, and more.

---

## Features

- **Real WhatsApp Web protocol**: Noise handshake, QR pairing, session persistence, reconnection logic
- **Send/receive real messages**: text, images, video, documents, reactions, etc.
- **Media upload**: upload images, video, documents to WhatsApp servers
- **Groups**: create, add/remove participants, send group messages, group events
- **Status (Stories)**: upload, fetch, subscribe to status updates
- **Profile picture**: set, get, subscribe to profile picture changes
- **Contacts**: get, update, subscribe to contact changes
- **Broadcast**: send broadcast messages, subscribe to broadcast events
- **Full event system**: subscribe to any event (messages, groups, status, contacts, etc.)
- **Automatic reconnection and session recovery**
- **Pure JavaScript, no TypeScript**

---

## Installation

```bash
npm install whatsapp-web-js-library
```

---

## Quick Start

```js
const WhatsAppWeb = require('whatsapp-web-js-library');

const client = new WhatsAppWeb();

(async () => {
    await client.connect(); // Shows QR code for pairing if no session exists

    // Send a text message
    client.sendTextMessage('123456789@s.whatsapp.net', 'Hello from JS!');

    // Send an image
    client.sendImageMessage('123456789@s.whatsapp.net', 'https://example.com/image.jpg', 'image/jpeg', 'A cool image!');

    // Send a video
    client.sendVideoMessage('123456789@s.whatsapp.net', 'https://example.com/video.mp4', 'video/mp4', 'A video!');

    // Send a document
    client.sendDocumentMessage('123456789@s.whatsapp.net', 'https://example.com/doc.pdf', 'application/pdf', 'Document.pdf');

    // Send a reaction
    client.sendReaction('123456789@s.whatsapp.net', '👍', 'msg-key-123');

    // Listen for incoming messages
    client.onMessage((msg) => {
        console.log('Received message:', msg);
    });

    // Group management
    client.createGroup('Test Group', ['123456789@s.whatsapp.net', '987654321@s.whatsapp.net']);
    client.addParticipants('123456789-123@g.us', ['111111111@s.whatsapp.net']);
    client.removeParticipants('123456789-123@g.us', ['987654321@s.whatsapp.net']);
    client.sendGroupMessage('123456789-123@g.us', 'Hello group!');
    client.onGroupEvent((event) => {
        console.log('Group event:', event);
    });

    // Status (Stories)
    client.uploadStatus('https://example.com/story.jpg', 'New story!');
    client.getStatuses();
    client.onStatusUpdate((status) => {
        console.log('Status update:', status);
    });

    // Profile picture
    client.setProfilePic('https://example.com/avatar.jpg');
    client.getProfilePic('123456789@s.whatsapp.net');
    client.onProfilePicUpdate((pic) => {
        console.log('Profile pic changed:', pic);
    });

    // Contacts
    client.getContact('123456789@s.whatsapp.net');
    client.updateContact('123456789@s.whatsapp.net', { name: 'New Name' });
    client.onContactUpdate((contact) => {
        console.log('Contact update:', contact);
    });

    // Broadcast
    client.sendBroadcast(['123456789@s.whatsapp.net', '987654321@s.whatsapp.net'], 'Hello broadcast!');
    client.onBroadcastEvent((event) => {
        console.log('Broadcast event:', event);
    });
})();
```

---

## Roadmap & Status

- [x] Real WhatsApp Web Noise handshake, QR pairing, session persistence
- [x] Real message/media send/receive (text, image, video, document, reaction)
- [x] Media upload to WhatsApp servers
- [x] Group management (create, add/remove, events)
- [x] Status (Stories) API and events
- [x] Profile picture API and events
- [x] Contacts API and events
- [x] Broadcast API and events
- [x] Automatic reconnection, retry logic
- [x] Full event system
- [x] Pure JavaScript, no TypeScript
- [ ] **Advanced features (WIP):**
    - Some advanced endpoints (status, profile pic, broadcast, group events) may require further protocol reverse engineering and testing on WhatsApp real accounts. The library provides the structure and pattern for all features, and is ready for community contributions and rapid extension.

---

## Contributing

- Pull requests are welcome! If you want to help with advanced features, protocol updates, or bugfixes, open a PR or issue.
- See TODOs in the code for places where more protocol work is needed (especially for advanced group/status/profile/broadcast events).
- Please test on a WhatsApp test account before using in production.

---

## License

MIT