class Contacts {
    constructor(ws) {
        this.ws = ws;
    }

    getContacts() {
        // TODO: Returnează lista de contacte reale
        return [];
    }

    getContact(jid) {
        // TODO: Returnează info contact
        console.log('Get contact:', jid);
        return null;
    }
    updateContact(jid, info) {
        // TODO: Actualizează info contact
        console.log('Update contact:', jid, info);
    }
    onContactUpdate(callback) {
        // TODO: Primește evenimente de update contact
        // this.ws.on('message', ...)
    }
}

module.exports = Contacts;