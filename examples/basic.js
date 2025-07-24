const WhatsAppWeb = require('../src/index');

const client = new WhatsAppWeb();

(async () => {
    await client.connect(); // Va afișa QR code-ul (simulat)

    // Exemplu de trimitere mesaj (simulat)
    client.sendMessage('123456789@s.whatsapp.net', 'Salut, acesta este un test!');
})();