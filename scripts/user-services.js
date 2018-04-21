const userServices = (function () {

    function loadAllUsers() {
        let endPoint = '?query={}';
        return remote.get('user', 'kinvey', endPoint)
    }

    function loadUser(id) {
        return remote.get('user', 'kinvey', id);
    }

    async function followUser(targetId) {
        let myId = sessionStorage.getItem('myId');
        let subscriptions = sessionStorage.getItem('subscriptions');
        subscriptions = JSON.parse(subscriptions);
        if (subscriptions.includes(targetId) === true)
            return;
        subscriptions.push(targetId);
        let data = {subscriptions};
        try{
            let user = await remote.update('user', 'kinvey', myId, data);
            authorization.saveSession(user);
        }
        catch (e){
            throw e;
        }
    }

    async function unFollowUser(targetId) {
        let myId = sessionStorage.getItem('myId');
        let subscriptions = sessionStorage.getItem('subscriptions');
        subscriptions = JSON.parse(subscriptions);
        subscriptions = subscriptions.filter(id => id !== targetId);
        let data = {subscriptions};
        try {
            let user = await remote.update('user', 'kinvey', myId, data);
            authorization.saveSession(user);
        }
        catch (e) {
            throw e;
        }
    }

    async function getUserFollowersCount(userId) {
        let endPoint = `?query={"subscriptions":"${userId}"}`;
        return (await remote.get('user', 'kinvey', endPoint)).length;
    }

    return {loadAllUsers, loadUser, followUser, unFollowUser, getUserFollowersCount};
}());