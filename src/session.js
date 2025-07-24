const fs = require('fs');
const path = require('path');

class Session {
    constructor() {
        this.data = null;
        this.file = path.join(__dirname, '../session.json');
    }

    save(sessionData) {
        this.data = sessionData;
        fs.writeFileSync(this.file, JSON.stringify(sessionData, null, 2));
    }

    load() {
        if (fs.existsSync(this.file)) {
            this.data = JSON.parse(fs.readFileSync(this.file));
        }
        return this.data;
    }
}

module.exports = Session;