class Session {
    constructor() {
        this.data = null;
    }

    save(sessionData) {
        // TODO: Salvează sesiunea pe disc sau în memorie
        this.data = sessionData;
    }

    load() {
        // TODO: Încarcă sesiunea de pe disc sau din memorie
        return this.data;
    }
}

module.exports = Session;