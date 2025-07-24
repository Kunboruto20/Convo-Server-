// WhatsApp Web JS Library - Entry Point

const WebSocket = require('ws');
const Auth = require('./auth');
const Session = require('./session');
const Messages = require('./messages');
const Contacts = require('./contacts');
const Groups = require('./groups');

class WhatsAppWeb {
    constructor() {
        this.ws = null;
        this.auth = new Auth();
        this.session = new Session();
        this.messages = new Messages(this.ws);
        this.contacts = new Contacts(this.ws);
        this.groups = new Groups(this.ws);
    }

    async connect() {
        // Începe pairing-ul cu QR code
        await this.auth.startPairing();
        // TODO: După pairing, inițializează WebSocket și sesiunea
    }

    sendMessage(jid, content) {
        this.messages.sendMessage(jid, content);
    }

    onMessage(callback) {
        this.messages.onMessage(callback);
    }

    getContacts() {
        return this.contacts.getContacts();
    }

    getGroups() {
        return this.groups.getGroups();
    }

    sendTextMessage(jid, text) {
        this.messages.sendTextMessage(jid, text);
    }
    sendImageMessage(jid, url, mimetype, caption) {
        this.messages.sendImageMessage(jid, url, mimetype, caption);
    }
    sendVideoMessage(jid, url, mimetype, caption) {
        this.messages.sendVideoMessage(jid, url, mimetype, caption);
    }
    sendDocumentMessage(jid, url, mimetype, fileName) {
        this.messages.sendDocumentMessage(jid, url, mimetype, fileName);
    }
    sendReaction(jid, text, key) {
        this.messages.sendReaction(jid, text, key);
    }
}

module.exports = WhatsAppWeb;