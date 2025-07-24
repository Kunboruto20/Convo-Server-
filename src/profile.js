class Profile {
    constructor(ws) {
        this.ws = ws;
    }
    setProfilePic(imageUrl) {
        // TODO: Setează poza de profil
        console.log('Set profile pic:', imageUrl);
    }
    getProfilePic(jid) {
        // TODO: Returnează poza de profil pentru jid
        console.log('Get profile pic for:', jid);
        return null;
    }
    onProfilePicUpdate(callback) {
        // TODO: Primește evenimente de schimbare profile pic
        // this.ws.on('message', ...)
    }
}
module.exports = Profile;