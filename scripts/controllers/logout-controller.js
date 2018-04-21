controllers.logoutController = (function () {

    function logoutUser(ctx) {
        authorization.logout();
        sessionStorage.clear();
        ctx.redirect("#/index");
        notifications.showInfo('Logout successful.');
    }

    return {logoutUser};
}());