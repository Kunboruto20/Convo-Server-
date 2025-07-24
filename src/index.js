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
}

module.exports = WhatsAppWeb;