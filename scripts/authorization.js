let authorization = (function () {

    function saveSession(user) {
        let subscriptions = user.subscriptions || [];
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('authtoken', user._kmd.authtoken);
        sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        sessionStorage.setItem('myId', user._id);
    }

    function loggedIn() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function register(username, password, repeatPassword) {
        if (username.length < 5){
            notifications.showError('Username should be at least 5 symbols long.');
            return;
        }
        if(password !== repeatPassword){
            notifications.showError('Passwords do not match.');
            return;
        }

        let data = {username, password,'subscriptions':null};
        return remote.post('user', 'basic', '', data);
    }

    function login(username, password) {
        let data = {username, password};
        return remote.post('user', 'basic', 'login', data);
    }

    function logout() {
        let logoutData = {
            'authtoken': sessionStorage.getItem('authtoken')
        };
        return remote.post('user', 'kinvey', '_logout', logoutData);
    }

    return {register, login, logout, saveSession, loggedIn}
}());