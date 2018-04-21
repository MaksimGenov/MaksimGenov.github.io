const chirpServices = (function () {

    async function loadFollowedChirps() {
        let subs = sessionStorage.getItem('subscriptions');
        let endPoint = `chirps/?query={"_acl.creator":{"$in": ${subs}}}&sort={"_kmd.ect": -1}`;
        return await remote.get('appdata', 'kinvey', endPoint);

    }

    function loadChirpsByUserId(userId) {
        let endPoint = `chirps/?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', 'kinvey', endPoint);
    }

    function loadMyChirps() {
        let myId = sessionStorage.getItem('myId');
        let endPoint = `chirps/?query={"_acl.creator":"${myId}"}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', 'kinvey', endPoint);
    }

    function postChirp(author, text) {
        let data = {author, text};
        return remote.post('appdata', 'kinvey', 'chirps', data);
    }

    function deleteChirp(id) {
        let endPoint = 'chirps/' + id;
        return remote.remove('appdata', 'kinvey', endPoint);
    }

    return {loadFollowedChirps, loadChirpsByUserId, postChirp, loadMyChirps, deleteChirp};
}());