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

    // Exemplu creare grup
    client.createGroup('Grup Test', ['123456789@s.whatsapp.net', '987654321@s.whatsapp.net']);
    // Exemplu adăugare membri
    client.addParticipants('123456789-123@g.us', ['111111111@s.whatsapp.net']);
    // Exemplu eliminare membri
    client.removeParticipants('123456789-123@g.us', ['987654321@s.whatsapp.net']);
    // Exemplu trimitere mesaj către grup
    client.sendGroupMessage('123456789-123@g.us', 'Salut grup!');
    // Subscribe la evenimente de grup
    client.onGroupEvent((event) => {
        console.log('Eveniment grup:', event);
    });

    // Exemplu upload imagine și trimitere ca mesaj media
    /*
    const fs = require('fs');
    const imgBuffer = fs.readFileSync('cale/catre/poza.jpg');
    const imgUrl = await client.uploadMedia(imgBuffer, 'image/jpeg');
    client.sendImageMessage('123456789@s.whatsapp.net', imgUrl, 'image/jpeg', 'Poza uploadată!');
    */

    // Exemplu statusuri
    client.uploadStatus('https://exemplu.com/story.jpg', 'Story nou!');
    client.getStatuses();
    client.onStatusUpdate((status) => {
        console.log('Status nou:', status);
    });
    // Exemplu profile pic
    client.setProfilePic('https://exemplu.com/avatar.jpg');
    client.getProfilePic('123456789@s.whatsapp.net');
    client.onProfilePicUpdate((pic) => {
        console.log('Profile pic schimbat:', pic);
    });
    // Exemplu contacte
    client.getContact('123456789@s.whatsapp.net');
    client.updateContact('123456789@s.whatsapp.net', { name: 'Nume Nou' });
    client.onContactUpdate((contact) => {
        console.log('Contact update:', contact);
    });
    // Exemplu broadcast
    client.sendBroadcast(['123456789@s.whatsapp.net', '987654321@s.whatsapp.net'], 'Salut broadcast!');
    client.onBroadcastEvent((event) => {
        console.log('Eveniment broadcast:', event);
    });
})();