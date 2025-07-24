class Status {
    constructor(ws) {
        this.ws = ws;
    }
    uploadStatus(mediaUrl, caption) {
        // TODO: Trimite status (story) nou
        console.log('Upload status:', mediaUrl, caption);
    }
    getStatuses() {
        // TODO: Returnează statusurile contactelor
        console.log('Get statuses');
        return [];
    }
    onStatusUpdate(callback) {
        // TODO: Primește evenimente de status
        // this.ws.on('message', ...)
    }
}
module.exports = Status;