const WhatsAppWeb = require('../src/index');

const client = new WhatsAppWeb();

(async () => {
    await client.connect(); // Va afișa QR code-ul (simulat)

    // Exemplu de trimitere mesaj text
    client.sendTextMessage('123456789@s.whatsapp.net', 'Salut, acesta este un test!');
    // Exemplu de trimitere imagine
    client.sendImageMessage('123456789@s.whatsapp.net', 'https://exemplu.com/poza.jpg', 'image/jpeg', 'O poză!');
    // Exemplu de trimitere video
    client.sendVideoMessage('123456789@s.whatsapp.net', 'https://exemplu.com/video.mp4', 'video/mp4', 'Un video!');
    // Exemplu de trimitere document
    client.sendDocumentMessage('123456789@s.whatsapp.net', 'https://exemplu.com/doc.pdf', 'application/pdf', 'Document.pdf');
    // Exemplu de trimitere reacție
    client.sendReaction('123456789@s.whatsapp.net', '👍', 'msg-key-123');
})();