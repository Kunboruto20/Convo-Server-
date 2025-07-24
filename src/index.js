// WhatsApp Web JS Library - Entry Point

const WebSocket = require('ws');
const Auth = require('./auth');
const Session = require('./session');
const Messages = require('./messages');
const Contacts = require('./contacts');
const Groups = require('./groups');
const Status = require('./status');
const Profile = require('./profile');
const Broadcast = require('./broadcast');

class WhatsAppWeb {
    constructor() {
        this.ws = null;
        this.auth = new Auth();
        this.session = new Session();
        this.messages = new Messages(this.ws);
        this.contacts = new Contacts(this.ws);
        this.groups = new Groups(this.ws);
        this.status = new Status(this.ws);
        this.profile = new Profile(this.ws);
        this.broadcast = new Broadcast(this.ws);
    }

    async connect() {
        // Începe pairing-ul cu QR code
        await this.auth.startPairing();
        // După pairing, inițializează WebSocket și sesiunea
        // Transmit ws și cheile de sesiune către Messages
        if (this.auth.ws && this.auth.noise && this.auth.noise.sessionKey) {
            this.messages = new Messages(this.auth.ws, this.auth.noise.sessionKey);
        }
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

    async uploadMedia(fileBuffer, mimetype) {
        return await this.messages.uploadMedia(fileBuffer, mimetype);
    }

    createGroup(subject, participants) {
        this.groups.createGroup(subject, participants);
    }
    addParticipants(groupJid, participants) {
        this.groups.addParticipants(groupJid, participants);
    }
    removeParticipants(groupJid, participants) {
        this.groups.removeParticipants(groupJid, participants);
    }
    sendGroupMessage(groupJid, text) {
        this.groups.sendGroupMessage(groupJid, text);
    }
    onGroupEvent(callback) {
        this.groups.onGroupEvent(callback);
    }

    // Statusuri
    uploadStatus(mediaUrl, caption) {
        this.status.uploadStatus(mediaUrl, caption);
    }
    getStatuses() {
        return this.status.getStatuses();
    }
    onStatusUpdate(callback) {
        this.status.onStatusUpdate(callback);
    }
    // Profile pic
    setProfilePic(imageUrl) {
        this.profile.setProfilePic(imageUrl);
    }
    getProfilePic(jid) {
        return this.profile.getProfilePic(jid);
    }
    onProfilePicUpdate(callback) {
        this.profile.onProfilePicUpdate(callback);
    }
    // Contacte
    getContact(jid) {
        return this.contacts.getContact(jid);
    }
    updateContact(jid, info) {
        this.contacts.updateContact(jid, info);
    }
    onContactUpdate(callback) {
        this.contacts.onContactUpdate(callback);
    }
    // Broadcast
    sendBroadcast(jids, text) {
        this.broadcast.sendBroadcast(jids, text);
    }
    onBroadcastEvent(callback) {
        this.broadcast.onBroadcastEvent(callback);
    }
}

module.exports = WhatsAppWeb;